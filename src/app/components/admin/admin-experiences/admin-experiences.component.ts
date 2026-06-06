import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ExperienceService } from '../../../services/experience.service';
import { Experience } from '../../../models/types';

@Component({
  selector: 'app-admin-experiences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <div>
          <h1>Gestion des Expériences</h1>
          <p>Ajoutez, modifiez ou supprimez vos expériences professionnelles.</p>
        </div>
        <button class="btn btn-primary" (click)="openAddModal()">
          <i class="fa-solid fa-plus"></i> Nouvelle Expérience
        </button>
      </div>

      <div class="table-container card">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Poste / Titre</th>
              <th>Entreprise</th>
              <th>Période</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (exp of experiences(); track exp.id) {
              <tr>
                <td><strong>{{ exp.titre }}</strong></td>
                <td>{{ exp.entreprise }}</td>
                <td>{{ exp.dateDebut }} &mdash; {{ exp.dateFin }}</td>
                <td class="text-right">
                  <div class="action-buttons">
                    <button class="btn-icon" (click)="openEditModal(exp)" title="Modifier">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-icon text-danger" (click)="confirmDelete(exp.id)" title="Supprimer">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="4" class="text-center py-4">Aucune expérience trouvée.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Modal Add/Edit -->
      @if (showModal()) {
        <div class="modal-overlay">
          <div class="modal-card card">
            <div class="modal-header">
              <h2>{{ isEditing() ? 'Modifier l\\'expérience' : 'Nouvelle Expérience' }}</h2>
              <button class="btn-icon" (click)="closeModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            
            <form #expForm="ngForm" (ngSubmit)="onSubmit(expForm)">
              <div class="form-row">
                <div class="input-group">
                  <label for="titre">Titre du poste *</label>
                  <input type="text" id="titre" name="titre" class="input-control" 
                         [(ngModel)]="formData.titre" required>
                </div>
                <div class="input-group">
                  <label for="entreprise">Entreprise *</label>
                  <input type="text" id="entreprise" name="entreprise" class="input-control" 
                         [(ngModel)]="formData.entreprise" required>
                </div>
              </div>
              
              <div class="form-row">
                <div class="input-group">
                  <label for="dateDebut">Date de début *</label>
                  <input type="text" id="dateDebut" name="dateDebut" class="input-control" 
                         placeholder="ex: 2024-06-01" [(ngModel)]="formData.dateDebut" required>
                </div>
                <div class="input-group">
                  <label for="dateFin">Date de fin *</label>
                  <input type="text" id="dateFin" name="dateFin" class="input-control" 
                         placeholder="ex: 2024-08-31 ou Présent" [(ngModel)]="formData.dateFin" required>
                </div>
              </div>
              
              <div class="input-group">
                <label for="description">Description *</label>
                <textarea id="description" name="description" class="input-control" rows="4"
                          [(ngModel)]="formData.description" required></textarea>
              </div>
              
              <div class="modal-actions">
                <button type="button" class="btn btn-outline" (click)="closeModal()">Annuler</button>
                <button type="submit" class="btn btn-primary" [disabled]="expForm.invalid">
                  {{ isEditing() ? 'Enregistrer' : 'Créer' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Confirmation Delete Modal -->
      @if (showDeleteModal()) {
        <div class="modal-overlay">
          <div class="modal-card card" style="max-width: 400px; text-align: center;">
            <h3 style="margin-bottom: 1rem; color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> Suppression</h3>
            <p>Voulez-vous vraiment supprimer cette expérience ? Cette action est irréversible.</p>
            <div class="modal-actions" style="justify-content: center; margin-top: 2rem;">
              <button class="btn btn-outline" (click)="cancelDelete()">Annuler</button>
              <button class="btn" style="background: #ef4444; color: white;" (click)="deleteConfirmed()">Supprimer</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .admin-page {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .page-header h1 {
      margin-bottom: 0.25rem;
    }
    .page-header p {
      color: var(--text-secondary);
      margin-bottom: 0;
    }
    
    .table-container {
      overflow-x: auto;
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
    }
    .admin-table th, .admin-table td {
      padding: 1rem 1.25rem;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }
    .admin-table th {
      font-weight: 600;
      color: var(--text-secondary);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background-color: rgba(0,0,0,0.02);
    }
    .admin-table tr:last-child td {
      border-bottom: none;
    }
    .admin-table tbody tr:hover {
      background-color: var(--bg-tertiary);
    }
    .text-right { text-align: right !important; }
    .text-center { text-align: center !important; }
    .py-4 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
    
    .action-buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }
    .btn-icon {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      width: 2rem;
      height: 2rem;
      border-radius: 0.375rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .btn-icon:hover {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }
    .text-danger:hover {
      color: #ef4444;
      background-color: #fef2f2;
    }

    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 1rem;
    }
    .modal-card {
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 2rem;
      animation: slideUp 0.3s ease-out;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    .modal-header h2 {
      margin: 0;
      font-size: 1.25rem;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
    }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class AdminExperiencesComponent {
  private experienceService = inject(ExperienceService);
  
  experiences = this.experienceService.allExperiences;

  showModal = signal(false);
  isEditing = signal(false);
  currentId = signal<number | null>(null);

  showDeleteModal = signal(false);
  itemToDelete = signal<number | null>(null);

  formData: Partial<Experience> = {
    titre: '',
    entreprise: '',
    description: '',
    dateDebut: '',
    dateFin: ''
  };

  openAddModal() {
    this.isEditing.set(false);
    this.currentId.set(null);
    this.resetForm();
    this.showModal.set(true);
  }

  openEditModal(exp: Experience) {
    this.isEditing.set(true);
    this.currentId.set(exp.id);
    this.formData = { ...exp };
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  resetForm() {
    this.formData = {
      titre: '',
      entreprise: '',
      description: '',
      dateDebut: '',
      dateFin: ''
    };
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEditing() && this.currentId() !== null) {
        this.experienceService.updateExperience({
          id: this.currentId()!,
          ...this.formData
        } as Experience);
      } else {
        this.experienceService.addExperience(this.formData as Omit<Experience, 'id'>);
      }
      this.closeModal();
    }
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
