import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienceService } from '../../../services/experience.service';
import { Experience } from '../../../models/types';

@Component({
  selector: 'app-admin-experiences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-experiences.component.html',
  styleUrl: './admin-experiences.component.css'
})
export class AdminExperiencesComponent {
  private experienceService = inject(ExperienceService);
  private fb = inject(FormBuilder);

  get experiences(): Experience[] {
    return this.experienceService.allExperiences;
  }

  expForm: FormGroup = this.fb.group({
    titre:       ['', Validators.required],
    entreprise:  ['', Validators.required],
    description: ['', Validators.required],
    dateDebut:   ['', Validators.required],
    dateFin:     ['', Validators.required]
  });

  showModal = signal(false);
  isEditing = signal(false);
  private editingExpId: number | null = null;

  showDeleteModal = signal(false);
  itemToDelete = signal<number | null>(null);

  openAddModal() {
    this.isEditing.set(false);
    this.editingExpId = null;
    this.expForm.reset();
    this.showModal.set(true);
  }

  openEditModal(exp: Experience) {
    this.isEditing.set(true);
    this.editingExpId = exp.id;
    this.expForm.patchValue({
      titre:       exp.titre,
      entreprise:  exp.entreprise,
      description: exp.description,
      dateDebut:   exp.dateDebut,
      dateFin:     exp.dateFin
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  onSubmit() {
    this.expForm.markAllAsTouched();
    if (this.expForm.invalid) return;

    const val = this.expForm.value as Omit<Experience, 'id'>;

    if (this.isEditing() && this.editingExpId !== null) {
      this.experienceService.updateExperience({ ...val, id: this.editingExpId });
    } else {
      this.experienceService.addExperience(val);
    }

    this.closeModal();
  }

  confirmDelete(id: number) {
    this.itemToDelete.set(id);
    this.showDeleteModal.set(true);
  }

  cancelDelete() {
    this.showDeleteModal.set(false);
    this.itemToDelete.set(null);
  }

  deleteConfirmed() {
    const id = this.itemToDelete();
    if (id !== null) {
      this.experienceService.deleteExperience(id);
      this.cancelDelete();
    }
  }
}
