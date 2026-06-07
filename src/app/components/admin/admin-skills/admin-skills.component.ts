import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompetenceService } from '../../../services/competence.service';
import { Competence } from '../../../models/types';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  private competenceService = inject(CompetenceService);
  private fb = inject(FormBuilder);

  skills = this.competenceService.allSkills;

  skillForm: FormGroup = this.fb.group({
    nom:   ['', Validators.required],
    niveau: ['Débutant', Validators.required],
    icone: ['fa-solid fa-code']
  });

  showFormModal = signal(false);
  isEditing = signal(false);
  private editingSkillId: number | null = null;

  showDeleteModal = signal(false);
  skillToDeleteId = signal<number | null>(null);

  openAddModal() {
    this.isEditing.set(false);
    this.editingSkillId = null;
    this.skillForm.reset({ niveau: 'Débutant', icone: 'fa-solid fa-code' });
    this.showFormModal.set(true);
  }

  openEditModal(skill: Competence) {
    this.isEditing.set(true);
    this.editingSkillId = skill.id;
    this.skillForm.patchValue({ nom: skill.nom, niveau: skill.niveau, icone: skill.icone });
    this.showFormModal.set(true);
  }

  closeFormModal() {
    this.showFormModal.set(false);
  }

  saveSkill() {
    this.skillForm.markAllAsTouched();
    if (this.skillForm.invalid) return;

    const val = this.skillForm.value;
    const skillData = {
      nom:   val.nom,
      niveau: val.niveau as 'Débutant' | 'Intermédiaire' | 'Avancé',
      icone: val.icone || 'fa-solid fa-code'
    };

    if (this.isEditing() && this.editingSkillId !== null) {
      this.competenceService.updateSkill({ ...skillData, id: this.editingSkillId });
    } else {
      this.competenceService.addSkill(skillData);
    }

    this.closeFormModal();
  }

  confirmDelete(id: number) {
    this.skillToDeleteId.set(id);
    this.showDeleteModal.set(true);
  }

  cancelDelete() {
    this.showDeleteModal.set(false);
    this.skillToDeleteId.set(null);
  }

  deleteConfirmed() {
    const id = this.skillToDeleteId();
    if (id !== null) {
      this.competenceService.deleteSkill(id);
      this.cancelDelete();
    }
  }
}
