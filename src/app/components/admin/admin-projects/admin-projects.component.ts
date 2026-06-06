import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjetService } from '../../../services/projet.service';
import { Projet } from '../../../models/types';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="projects-admin-container">
      <!-- Header with Indicators -->
      <div class="admin-header-row">
        <div>
          <h1>Projects Hub</h1>
          <p class="indicator-text">
            <strong>{{ totalCount() }}</strong> projets au total &middot; 
            <span class="badge badge-published">{{ publishedCount() }} visibles en ligne</span>
          </p>
        </div>
        <button class="btn btn-primary" (click)="openAddModal()">
          <i class="fa-solid fa-plus"></i> Nouveau projet
        </button>
      </div>

      <!-- Search and Sort Panel -->
      <div class="controls-panel card">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Rechercher un projet..." [(ngModel)]="searchQuery" />
        </div>
        <div class="sort-box">
          <label>Trier par :</label>
          <select class="input-control select-sort" [(ngModel)]="sortBy">
            <option value="recent">Plus récent</option>
            <option value="oldest">Plus ancien</option>
            <option value="title">Titre (A-Z)</option>
          </select>
        </div>
      </div>

      <!-- Projects Table -->
      <div class="table-container card">
        @if (filteredAndSortedProjects().length === 0) {
          <div class="empty-table">
            <i class="fa-solid fa-folder-open"></i>
            <p>Aucun projet ne correspond à votre recherche.</p>
          </div>
        } @else {
          <table class="admin-table">
            <thead>
              <tr>
                <th>Projet</th>
                <th>Technologies</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (proj of filteredAndSortedProjects(); track proj.id) {
                <tr>
                  <td class="proj-title-cell">
                    <div class="proj-title-info">
                      <div class="avatar-icon">
                        {{ proj.titre.slice(0,1).toUpperCase() }}
                      </div>
                      <div>
                        <span class="proj-name">{{ proj.titre }}</span>
                        @if (proj.github) {
                          <a [href]="proj.github" target="_blank" class="github-icon-link" title="Code Source">
                            <i class="fa-brands fa-github"></i>
                          </a>
                        }
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="tech-tags-list">
                      @for (tech of proj.technologies; track tech) {
                        <span class="tech-tag mini">{{ tech }}</span>
                      }
                    </div>
                  </td>
                  <td>
                    <button class="status-toggle-btn" 
                            [class.pub]="proj.statut === 'Publié'"
                            [class.draft]="proj.statut === 'Brouillon'"
                            (click)="toggleStatus(proj)"
                            title="Cliquez pour changer le statut">
                      {{ proj.statut }}
                    </button>
                  </td>
                  <td>
                    <span class="proj-date-text">{{ proj.date || 'Non spécifiée' }}</span>
                  </td>
                  <td class="actions-cell">
                    <button class="action-btn edit-btn" (click)="openEditModal(proj)" title="Modifier">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="action-btn delete-btn" (click)="confirmDelete(proj.id)" title="Supprimer">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>

      <!-- Add/Edit Project Modal (RM1 Validations inside) -->
      @if (showFormModal()) {
        <div class="modal-overlay">
          <div class="modal-card form-modal card">
            <h2>{{ isEditing() ? 'Modifier le projet' : 'Nouveau Projet' }}</h2>
            <form #projForm="ngForm" (ngSubmit)="saveProject(projForm)" novalidate>
              
              <div class="input-group">
                <label for="titre">Titre du Projet *</label>
                <input type="text" id="titre" name="titre" class="input-control"
                       [(ngModel)]="formProject.titre" #titreRef="ngModel" required minlength="3" />
                @if (titreRef.invalid && (titreRef.dirty || titreRef.touched || formSubmitted())) {
                  <div class="error-text">
                    @if (titreRef.errors?.['required']) { <span>Le titre est requis.</span> }
                    @if (titreRef.errors?.['minlength']) { <span>Le titre doit faire au moins 3 caractères.</span> }
                  </div>
                }
              </div>

              <div class="input-group">
                <label for="description">Description *</label>
                <textarea id="description" name="description" class="input-control" rows="4"
                          [(ngModel)]="formProject.description" #descRef="ngModel" required minlength="10"></textarea>
                @if (descRef.invalid && (descRef.dirty || descRef.touched || formSubmitted())) {
                  <div class="error-text">
                    @if (descRef.errors?.['required']) { <span>La description est requise.</span> }
                    @if (descRef.errors?.['minlength']) { <span>La description doit faire au moins 10 caractères.</span> }
                  </div>
                }
              </div>

              <div class="input-group">
                <label for="techInput">Technologies (séparées par des virgules) *</label>
                <input type="text" id="techInput" name="techInput" class="input-control"
                       placeholder="Ex: Angular, TypeScript, Node.js"
                       [(ngModel)]="techInputString" required />
                @if (techInputSubmittedInvalid() || (!techInputString.trim() && formSubmitted())) {
                  <div class="error-text">
                    <span>Veuillez spécifier au moins une technologie (RM1).</span>
                  </div>
                }
              </div>

              <div class="form-row-2">
                <div class="input-group">
                  <label for="statut">Statut</label>
                  <select id="statut" name="statut" class="input-control" [(ngModel)]="formProject.statut">
                    <option value="Publié">Publié</option>
                    <option value="Brouillon">Brouillon</option>
                  </select>
                </div>

                <div class="input-group">
                  <label for="date">Date de création</label>
                  <input type="date" id="date" name="date" class="input-control" [(ngModel)]="formProject.date" />
                </div>
              </div>

              <div class="input-group">
                <label for="github">Lien GitHub (optionnel)</label>
                <input type="url" id="github" name="github" class="input-control" placeholder="https://github.com/..."
                       [(ngModel)]="formProject.github" />
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
            <p>Êtes-vous sûr de vouloir supprimer définitivement ce projet ? Cette action est irréversible.</p>
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
    .projects-admin-container {
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
    .controls-panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.5rem;
      padding: 1rem 1.5rem;
    }
    .search-box {
      position: relative;
      flex-grow: 1;
      max-width: 400px;
    }
    .search-box i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-tertiary);
    }
    .search-box input {
      width: 100%;
      padding: 0.65rem 1rem 0.65rem 2.5rem;
      border-radius: 0.375rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      outline: none;
    }
    .search-box input:focus {
      border-color: var(--accent-primary);
    }
    .sort-box {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .sort-box label {
      font-size: 0.9rem;
      color: var(--text-secondary);
      white-space: nowrap;
    }
    .select-sort {
      padding: 0.5rem 1.5rem 0.5rem 0.75rem;
      font-size: 0.9rem;
      border-radius: 0.375rem;
      width: auto;
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
    .proj-title-cell {
      font-weight: 600;
    }
    .proj-title-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .avatar-icon {
      width: 2.25rem;
      height: 2.25rem;
      background: var(--accent-primary);
      color: white;
      border-radius: 0.375rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .proj-name {
      color: var(--text-primary);
    }
    .github-icon-link {
      margin-left: 0.5rem;
      color: var(--text-tertiary);
      transition: color 0.2s;
    }
    .github-icon-link:hover {
      color: var(--text-primary);
    }
    .tech-tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }
    .tech-tag.mini {
      font-size: 0.75rem;
      padding: 0.1rem 0.5rem;
      margin: 0;
    }
    .status-toggle-btn {
      padding: 0.25rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.2s;
    }
    .status-toggle-btn.pub {
      background-color: var(--status-published-bg);
      color: var(--status-published-text);
    }
    .status-toggle-btn.draft {
      background-color: var(--status-draft-bg);
      color: var(--status-draft-text);
    }
    .proj-date-text {
      font-size: 0.9rem;
      color: var(--text-secondary);
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
      max-width: 600px;
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
    .form-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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

    @keyframes scaleUp {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `]
})
export class AdminProjectsComponent {
  private projetService = inject(ProjetService);

  // Queries
  searchQuery = signal<string>('');
  sortBy = signal<string>('recent');

  // Full project list (signal computed from service)
  allProjects = this.projetService.allProjects;

  // Total count
  totalCount = computed(() => this.allProjects().length);
  publishedCount = computed(() => this.allProjects().filter(p => p.statut === 'Publié').length);

  // Form states
  showFormModal = signal(false);
  isEditing = signal(false);
  formSubmitted = signal(false);
  techInputString = '';

  // Base mock schema for adding/updating
  formProject: Partial<Projet> = {
    titre: '',
    description: '',
    statut: 'Publié',
    date: '',
    github: ''
  };

  // Delete modal states
  showDeleteModal = signal(false);
  projectToDeleteId = signal<number | null>(null);

  // Filtered and sorted projects
  filteredAndSortedProjects = computed(() => {
    let list = [...this.allProjects()];
    const query = this.searchQuery().trim().toLowerCase();

    // 1. Search Query filter
    if (query) {
      list = list.filter(p => 
        p.titre.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.technologies.some(t => t.toLowerCase().includes(query))
      );
    }

    // 2. Sort
    const sortVal = this.sortBy();
    if (sortVal === 'title') {
      list.sort((a, b) => a.titre.localeCompare(b.titre));
    } else if (sortVal === 'recent') {
      list.sort((a, b) => {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return db - da; // most recent first
      });
    } else if (sortVal === 'oldest') {
      list.sort((a, b) => {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return da - db; // oldest first
      });
    }

    return list;
  });

  // Check RM1 Rule
  techInputSubmittedInvalid(): boolean {
    return this.formSubmitted() && !this.techInputString.trim();
  }

  // Modals Actions
  openAddModal() {
    this.isEditing.set(false);
    this.formSubmitted.set(false);
    this.techInputString = '';
    this.formProject = {
      titre: '',
      description: '',
      statut: 'Publié',
      date: new Date().toISOString().split('T')[0], // Default to today
      github: ''
    };
    this.showFormModal.set(true);
  }

  openEditModal(project: Projet) {
    this.isEditing.set(true);
    this.formSubmitted.set(false);
    this.formProject = { ...project };
    this.techInputString = project.technologies.join(', ');
    this.showFormModal.set(true);
  }

  closeFormModal() {
    this.showFormModal.set(false);
  }

  saveProject(form: any) {
    this.formSubmitted.set(true);
    
    // Validate technology field (RM1 - at least 1 technology required)
    const rawTech = this.techInputString.trim();
    if (!rawTech) {
      return;
    }

    if (form.valid && this.formProject.titre && this.formProject.description) {
      const technologies = rawTech
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const projectData = {
        titre: this.formProject.titre,
        description: this.formProject.description,
        statut: this.formProject.statut as 'Publié' | 'Brouillon',
        date: this.formProject.date || new Date().toISOString().split('T')[0],
        github: this.formProject.github || '',
        technologies
      };

      if (this.isEditing()) {
        const updated: Projet = {
          ...projectData,
          id: (this.formProject as Projet).id
        };
        this.projetService.updateProject(updated);
      } else {
        this.projetService.addProject(projectData);
      }

      this.closeFormModal();
    }
  }

  // Delete confirmations (RM5)
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

  // Toggle status directly on click
  toggleStatus(project: Projet) {
    const nextStatus = project.statut === 'Publié' ? 'Brouillon' : 'Publié';
    this.projetService.updateProject({
      ...project,
      statut: nextStatus
    });
  }
}
