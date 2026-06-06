import { Component, inject, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="container page-container">
      @if (project()) {
        <div class="back-link">
          <a routerLink="/projets" class="btn btn-outline"><i class="fa-solid fa-arrow-left"></i> Retour aux projets</a>
        </div>
        
        <div class="card project-detail-card">
          <div class="project-header">
            <div class="header-badge-row">
              <span class="badge" [class.badge-published]="project()?.statut === 'Publié'" [class.badge-draft]="project()?.statut === 'Brouillon'">
                {{ project()?.statut }}
              </span>
              @if (project()?.date) {
                <span class="project-date">{{ project()?.date | date:'longDate':'':'fr' }}</span>
              }
            </div>
            <h1>{{ project()?.titre }}</h1>
          </div>
          
          <div class="project-meta">
            <div class="meta-section">
              <h3>Technologies Utilisées</h3>
              <div class="project-tags">
                @for (tech of project()?.technologies; track tech) {
                  <span class="tech-tag">{{ tech }}</span>
                }
              </div>
            </div>
          </div>
          
          <div class="project-content">
            <h3>Description du projet</h3>
            <p>{{ project()?.description }}</p>
          </div>

          @if (project()?.github) {
            <div class="project-actions">
              <a [href]="project()?.github" target="_blank" class="btn btn-primary github-btn">
                <i class="fa-brands fa-github"></i> Consulter le code sur GitHub
              </a>
            </div>
          }
        </div>
      } @else {
        <div class="empty-state">
          <i class="fa-solid fa-circle-exclamation"></i>
          <h3>Projet non trouvé</h3>
          <p>Le projet demandé n'existe pas ou a été retiré.</p>
          <a routerLink="/projets" class="btn btn-primary">Parcourir les projets</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container {
      padding: 4rem 1.5rem;
      max-width: 800px;
    }
    .back-link {
      margin-bottom: 2rem;
    }
    .project-detail-card {
      padding: 3rem;
    }
    .project-header {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
    }
    .header-badge-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .project-date {
      font-size: 0.875rem;
      color: var(--text-tertiary);
    }
    .project-header h1 {
      margin-bottom: 0;
      font-size: 2.5rem;
    }
    .project-meta {
      margin-bottom: 2rem;
    }
    .meta-section h3 {
      font-size: 1rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }
    .project-content {
      margin-bottom: 2.5rem;
    }
    .project-content h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }
    .project-content p {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--text-secondary);
    }
    .project-actions {
      display: flex;
      gap: 1rem;
      border-top: 1px solid var(--border-color);
      padding-top: 2rem;
    }
    .github-btn {
      gap: 0.5rem;
    }
    .empty-state {
      text-align: center;
      padding: 5rem 2rem;
      background-color: var(--bg-secondary);
      border-radius: 0.5rem;
      border: 1px dashed var(--border-color);
    }
    .empty-state i {
      font-size: 3rem;
      color: var(--text-tertiary);
      margin-bottom: 1rem;
    }
  `]
})
export class ProjectDetailComponent {
  projetService = inject(ProjetService);
  
  // Input parameter binding from route
  id = input<string>();
  
  // Computed project based on route id
  project = computed(() => {
    const projectId = this.id();
    if (projectId) {
      return this.projetService.getProjectById(+projectId);
    }
    return undefined;
  });
}

