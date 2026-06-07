import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetService } from '../../../services/projet.service';
import { Projet } from '../../../models/types';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.css'
})
export class AdminProjectsComponent {
  private projetService = inject(ProjetService);
  private fb = inject(FormBuilder);

  // Search / sort (not form fields — bound via event bindings in template)
  searchQuery = signal<string>('');
  sortBy = signal<string>('recent');

  allProjects = this.projetService.allProjects;
  totalCount = computed(() => this.allProjects().length);
  publishedCount = computed(() => this.allProjects().filter(p => p.statut === 'Publié').length);

  // Reactive form for add/edit modal
  projForm: FormGroup = this.fb.group({
    titre:       ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    techInput:   ['', Validators.required],
    statut:      ['Publié'],
    date:        [''],
    github:      ['']
  });

  showFormModal = signal(false);
  isEditing = signal(false);
  private editingProjectId: number | null = null;

  showDeleteModal = signal(false);
  projectToDeleteId = signal<number | null>(null);

  filteredAndSortedProjects = computed(() => {
    let list = [...this.allProjects()];
    const query = this.searchQuery().trim().toLowerCase();

    if (query) {
      list = list.filter(p =>
        p.titre.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some(t => t.toLowerCase().includes(query))
      );
    }

    const sortVal = this.sortBy();
    if (sortVal === 'title') {
      list.sort((a, b) => a.titre.localeCompare(b.titre));
    } else if (sortVal === 'recent') {
      list.sort((a, b) => {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return db - da;
      });
    } else if (sortVal === 'oldest') {
      list.sort((a, b) => {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return da - db;
      });
    }

    return list;
  });

  openAddModal() {
    this.isEditing.set(false);
    this.editingProjectId = null;
    this.projForm.reset({
      statut: 'Publié',
      date: new Date().toISOString().split('T')[0]
    });
    this.showFormModal.set(true);
  }

  openEditModal(project: Projet) {
    this.isEditing.set(true);
    this.editingProjectId = project.id;
    this.projForm.patchValue({
      titre:       project.titre,
      description: project.description,
      techInput:   project.technologies.join(', '),
      statut:      project.statut,
      date:        project.date || '',
      github:      project.github || ''
    });
    this.showFormModal.set(true);
  }

  closeFormModal() {
    this.showFormModal.set(false);
  }

  saveProject() {
    this.projForm.markAllAsTouched();
    if (this.projForm.invalid) return;

    const val = this.projForm.value;
    const technologies = (val.techInput as string)
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0);

    const projectData = {
      titre:       val.titre,
      description: val.description,
      statut:      val.statut as 'Publié' | 'Brouillon',
      date:        val.date || new Date().toISOString().split('T')[0],
      github:      val.github || '',
      technologies
    };

    if (this.isEditing() && this.editingProjectId !== null) {
      this.projetService.updateProject({ ...projectData, id: this.editingProjectId });
    } else {
      this.projetService.addProject(projectData);
    }

    this.closeFormModal();
  }

  confirmDelete(id: number) {
    this.projectToDeleteId.set(id);
    this.showDeleteModal.set(true);
  }

  cancelDelete() {
    this.showDeleteModal.set(false);
    this.projectToDeleteId.set(null);
  }

  deleteConfirmed() {
    const id = this.projectToDeleteId();
    if (id !== null) {
      this.projetService.deleteProject(id);
      this.cancelDelete();
    }
  }

  toggleStatus(project: Projet) {
    const nextStatus = project.statut === 'Publié' ? 'Brouillon' : 'Publié';
    this.projetService.updateProject({ ...project, statut: nextStatus });
  }
}
