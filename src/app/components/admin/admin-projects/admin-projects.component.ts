import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjetService } from '../../../services/projet.service';
import { Projet } from '../../../models/types';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.css'
})
export class AdminProjectsComponent {
  private projetService = inject(ProjetService);

  // ── Table ────────────────────────────────────
  searchQuery = signal('');
  sortBy      = signal('recent');

  get allProjects(): Projet[] {
    return this.projetService.allProjects;
  }

  get totalCount(): number {
    return this.allProjects.length;
  }

  get publishedCount(): number {
    return this.allProjects.filter(p => p.statut === 'Publié').length;
  }

  get filteredAndSortedProjects(): Projet[] {
    let list = [...this.allProjects];
    const q = this.searchQuery().trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.titre.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }
    if (this.sortBy() === 'title')   list.sort((a, b) => a.titre.localeCompare(b.titre));
    if (this.sortBy() === 'recent')  list.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
    if (this.sortBy() === 'oldest')  list.sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
    return list;
  }

  // ── Modal visibility ─────────────────────────
  showFormModal   = signal(false);
  isEditing       = signal(false);
  showDeleteModal = signal(false);
  projectToDeleteId = signal<number | null>(null);
  private editingProjectId: number | null = null;

  // ── Form signals (un par champ) ───────────────
  titre       = signal('');
  description = signal('');
  techInput   = signal('');
  statut      = signal<'Publié' | 'Brouillon'>('Publié');
  date        = signal('');
  github      = signal('');
  contexte    = signal('');
  role        = signal('');
  duree       = signal('');
  defisInput  = signal('');
  soumis      = signal(false);

  // ── Validation (getters) ──────────────────────
  get titreErreur(): string | null {
    if (!this.soumis()) return null;
    if (!this.titre().trim()) return 'Le titre est requis.';
    if (this.titre().trim().length < 3) return 'Le titre doit faire au moins 3 caractères.';
    return null;
  }

  get descriptionErreur(): string | null {
    if (!this.soumis()) return null;
    if (!this.description().trim()) return 'La description est requise.';
    if (this.description().trim().length < 10) return 'La description doit faire au moins 10 caractères.';
    return null;
  }

  get techInputErreur(): string | null {
    if (!this.soumis()) return null;
    if (!this.techInput().trim()) return 'Veuillez spécifier au moins une technologie.';
    return null;
  }

  private get formulaireInvalide(): boolean {
    return !!(this.titreErreur || this.descriptionErreur || this.techInputErreur);
  }

  // ── Ouvrir / fermer modales ───────────────────
  openAddModal() {
    this.isEditing.set(false);
    this.editingProjectId = null;
    this.titre.set('');
    this.description.set('');
    this.techInput.set('');
    this.statut.set('Publié');
    this.date.set(new Date().toISOString().split('T')[0]);
    this.github.set('');
    this.contexte.set('');
    this.role.set('');
    this.duree.set('');
    this.defisInput.set('');
    this.soumis.set(false);
    this.showFormModal.set(true);
  }

  openEditModal(project: Projet) {
    this.isEditing.set(true);
    this.editingProjectId = project.id;
    this.titre.set(project.titre);
    this.description.set(project.description);
    this.techInput.set(project.technologies.join(', '));
    this.statut.set(project.statut);
    this.date.set(project.date ?? '');
    this.github.set(project.github ?? '');
    this.contexte.set(project.contexte ?? '');
    this.role.set(project.role ?? '');
    this.duree.set(project.duree ?? '');
    this.defisInput.set((project.defis ?? []).join('\n'));
    this.soumis.set(false);
    this.showFormModal.set(true);
  }

  closeFormModal() { this.showFormModal.set(false); }

  // ── Sauvegarder ───────────────────────────────
  saveProject() {
    this.soumis.set(true);
    if (this.formulaireInvalide) return;

    const technologies = this.techInput()
      .split(',').map(t => t.trim()).filter(t => t.length > 0);
    const defis = this.defisInput()
      .split(/\r?\n|,/)
      .map(d => d.trim())
      .filter(d => d.length > 0);

    const data: Omit<Projet, 'id'> = {
      titre:        this.titre().trim(),
      description:  this.description().trim(),
      statut:       this.statut(),
      date:         this.date() || new Date().toISOString().split('T')[0],
      github:       this.github().trim() || undefined,
      technologies,
      contexte:     this.contexte().trim() || undefined,
      role:         this.role().trim() || undefined,
      duree:        this.duree().trim() || undefined,
      defis:        defis.length > 0 ? defis : undefined,
    };

    if (this.isEditing() && this.editingProjectId !== null) {
      this.projetService.updateProject({ ...data, id: this.editingProjectId });
    } else {
      this.projetService.addProject(data);
    }
    this.closeFormModal();
  }

  // ── Supprimer ─────────────────────────────────
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
    if (id !== null) { this.projetService.deleteProject(id); this.cancelDelete(); }
  }

  toggleStatus(project: Projet) {
    this.projetService.updateProject({
      ...project,
      statut: project.statut === 'Publié' ? 'Brouillon' : 'Publié'
    });
  }
}
