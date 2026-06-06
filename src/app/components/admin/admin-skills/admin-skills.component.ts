import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompetenceService } from '../../../services/competence.service';
import { Competence } from '../../../models/types';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="skills-admin-container">
      <div class="admin-header-row">
        <div>
          <h1>Skills Engine</h1>
          <p class="indicator-text">Gérez vos compétences techniques et niveaux d'expertise.</p>
        </div>
        <button class="btn btn-primary" (click)="openAddModal()">
          <i class="fa-solid fa-plus"></i> Nouvelle compétence
        </button>
      </div>

      <!-- Skills Table -->
      <div class="table-container card">
        @if (skills().length === 0) {
          <div class="empty-table">
            <i class="fa-solid fa-code"></i>
            <p>Aucune compétence n'a été ajoutée pour le moment.</p>
          </div>
        } @else {
          <table class="admin-table">
            <thead>
              <tr>
                <th>Compétence</th>
                <th>Niveau</th>
                <th>Icône</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (skill of skills(); track skill.id) {
                <tr>
                  <td>
                    <strong>{{ skill.nom }}</strong>
                  </td>
                  <td>
                    <span class="level-badge" [ngClass]="skill.niveau | lowercase">
                      {{ skill.niveau }}
                    </span>
                  </td>
                  <td>
                    <span class="skill-icon-preview">
                      <i [ngClass]="skill.icone || 'fa-solid fa-code'"></i>
                      <code class="icon-class">{{ skill.icone || 'fa-code' }}</code>
                    </span>
                  </td>
                  <td class="actions-cell">
                    <button class="action-btn edit-btn" (click)="openEditModal(skill)" title="Modifier">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="action-btn delete-btn" (click)="confirmDelete(skill.id)" title="Supprimer">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>

      <!-- Form Modal -->
      @if (showFormModal()) {
        <div class="modal-overlay">
          <div class="modal-card form-modal card">
            <h2>{{ isEditing() ? 'Modifier la compétence' : 'Nouvelle Compétence' }}</h2>
            <form #skillForm="ngForm" (ngSubmit)="saveSkill(skillForm)" novalidate>
              
              <div class="input-group">
                <label for="nom">Nom *</label>
                <input type="text" id="nom" name="nom" class="input-control"
                       [(ngModel)]="formSkill.nom" #nomRef="ngModel" required />
                @if (nomRef.invalid && (nomRef.dirty || nomRef.touched || formSubmitted())) {
                  <div class="error-text">Le nom est requis.</div>
                }
              </div>

              <div class="input-group">
                <label for="niveau">Niveau *</label>
                <select id="niveau" name="niveau" class="input-control" [(ngModel)]="formSkill.niveau" required>
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                </select>
              </div>

              <div class="input-group">
                <label for="icone">Classe Icône FontAwesome</label>
                <input type="text" id="icone" name="icone" class="input-control"
                       placeholder="Ex: fa-brands fa-angular"
                       [(ngModel)]="formSkill.icone" />
                <span class="input-tip">Visitez fontawesome.com pour trouver les classes CSS d'icônes.</span>
              </div>

              <div class="modal-actions">
                <button type="button" class="btn btn-outline" (click)="closeFormModal()">Annuler</button>
                <button type="submit" class="btn btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Delete Confirmation Modal (RM5) -->
      @if (showDeleteModal()) {
        <div class="modal-overlay">
          <div class="modal-card confirmation-modal card">
            <h3><i class="fa-solid fa-triangle-exclamation modal-warning-icon"></i> Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer définitivement cette compétence ? Cette action est irréversible.</p>
            <div class="modal-actions">
              <button class="btn btn-outline" (click)="cancelDelete()">Annuler</button>
              <button class="btn btn-danger" (click)="deleteConfirmed()">Supprimer</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .skills-admin-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .admin-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .admin-header-row h1 {
      margin-bottom: 0.25rem;
    }
    .indicator-text {
      margin-bottom: 0;
      color: var(--text-secondary);
      font-size: 0.95rem;
    }
    .table-container {
      padding: 0;
      overflow-x: auto;
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .admin-table th, .admin-table td {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }
    .admin-table th {
      font-weight: 600;
      color: var(--text-secondary);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background-color: var(--bg-tertiary);
    }
    .level-badge {
      display: inline-block;
      padding: 0.25rem 0.6rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .level-badge.débutant {
      background-color: #fee2e2;
      color: #991b1b;
    }
    .level-badge.intermédiaire {
      background-color: #fef9c3;
      color: #854d0e;
    }
    .level-badge.avancé {
      background-color: #dcfce7;
      color: #166534;
    }
    .skill-icon-preview {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .skill-icon-preview i {
      font-size: 1.2rem;
      color: var(--accent-primary);
      width: 1.5rem;
      text-align: center;
    }
    .icon-class {
      background: var(--bg-tertiary);
      padding: 0.1rem 0.35rem;
      border-radius: 0.25rem;
      font-size: 0.8rem;
    }
    .actions-cell {
      display: flex;
      gap: 0.5rem;
    }
    .action-btn {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem;
      border: 1px solid var(--border-color);
      transition: all 0.2s;
    }
    .edit-btn:hover {
      background-color: var(--bg-tertiary);
      color: var(--accent-primary);
    }
    .delete-btn {
      color: #ef4444;
    }
    .delete-btn:hover {
      background-color: #fef2f2;
      border-color: #fca5a5;
    }
    .empty-table {
      text-align: center;
      padding: 3rem;
      color: var(--text-tertiary);
    }
    .empty-table i {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    /* Modals & Forms */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .modal-card {
      background-color: var(--bg-secondary);
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      padding: 2rem;
      box-shadow: var(--shadow-lg);
      animation: scaleUp 0.2s ease-out;
    }
    .form-modal {
      width: 95%;
      max-width: 500px;
    }
    .confirmation-modal {
      width: 90%;
      max-width: 450px;
      text-align: center;
    }
    .modal-warning-icon {
      color: #f59e0b;
      margin-right: 0.5rem;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }
    .btn-danger {
      background: #ef4444;
      color: white;
    }
    .btn-danger:hover {
      background: #dc2626;
    }
    .input-tip {
      font-size: 0.75rem;
      color: var(--text-tertiary);
      display: block;
      margin-top: 0.25rem;
    }

    @keyframes scaleUp {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `]
})
export class AdminSkillsComponent {
  private competenceService = inject(CompetenceService);
  skills = this.competenceService.allSkills;

  // Modal states
  showFormModal = signal(false);
  isEditing = signal(false);
  formSubmitted = signal(false);

  formSkill: Partial<Competence> = {
    nom: '',
    niveau: 'Débutant',
    icone: ''
  };

  // Delete modal states
  showDeleteModal = signal(false);
  skillToDeleteId = signal<number | null>(null);

  openAddModal() {
    this.isEditing.set(false);
    this.formSubmitted.set(false);
    this.formSkill = {
      nom: '',
      niveau: 'Débutant',
      icone: 'fa-solid fa-code'
    };
    this.showFormModal.set(true);
  }

  openEditModal(skill: Competence) {
    this.isEditing.set(true);
    this.formSubmitted.set(false);
    this.formSkill = { ...skill };
    this.showFormModal.set(true);
  }

  closeFormModal() {
    this.showFormModal.set(false);
  }

  saveSkill(form: any) {
    this.formSubmitted.set(true);
    if (form.valid && this.formSkill.nom) {
      const skillData = {
        nom: this.formSkill.nom,
        niveau: this.formSkill.niveau as 'Débutant' | 'Intermédiaire' | 'Avancé',
        icone: this.formSkill.icone || 'fa-solid fa-code'
      };

      if (this.isEditing()) {
        this.competenceService.updateSkill({
          ...skillData,
          id: (this.formSkill as Competence).id
        });
      } else {
        this.competenceService.addSkill(skillData);
      }

      this.closeFormModal();
    }
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
