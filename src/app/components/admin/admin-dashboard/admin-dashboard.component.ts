import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';
import { CompetenceService } from '../../../services/competence.service';
import { ExperienceService } from '../../../services/experience.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dashboard-header">
      <h1>Tableau de Bord</h1>
      <p>Bienvenue sur votre espace d'administration DevFolio.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-icon" style="background-color: #e0e7ff; color: #4f46e5;">
          <i class="fa-solid fa-folder-open"></i>
        </div>
        <div class="stat-content">
          <h3>Projets</h3>
          <div class="stat-value">{{ projetService.allProjects().length }}</div>
        </div>
      </div>
      
      <div class="stat-card card">
        <div class="stat-icon" style="background-color: #dcfce7; color: #166534;">
          <i class="fa-solid fa-globe"></i>
        </div>
        <div class="stat-content">
          <h3>Publiés</h3>
          <div class="stat-value">{{ projetService.publishedProjects().length }}</div>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon" style="background-color: #fef9c3; color: #854d0e;">
          <i class="fa-solid fa-code"></i>
        </div>
        <div class="stat-content">
          <h3>Compétences</h3>
          <div class="stat-value">{{ competenceService.allSkills().length }}</div>
        </div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon" style="background-color: #f3e8ff; color: #7e22ce;">
          <i class="fa-solid fa-briefcase"></i>
        </div>
        <div class="stat-content">
          <h3>Expériences</h3>
          <div class="stat-value">{{ experienceService.allExperiences().length }}</div>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <h2>Actions Rapides</h2>
      <div class="actions-grid">
        <a routerLink="/admin/projets" class="action-card card">
          <div class="action-icon">
            <i class="fa-solid fa-list-check"></i>
          </div>
          <div class="action-text">
            <h3>Gérer les Projets</h3>
            <p>Ajouter, modifier ou supprimer des projets.</p>
          </div>
          <i class="fa-solid fa-chevron-right action-arrow"></i>
        </a>
        
        <a routerLink="/admin/competences" class="action-card card">
          <div class="action-icon">
            <i class="fa-solid fa-layer-group"></i>
          </div>
          <div class="action-text">
            <h3>Gérer les Compétences</h3>
            <p>Mettre à jour vos compétences techniques.</p>
          </div>
          <i class="fa-solid fa-chevron-right action-arrow"></i>
        </a>
        
        <a routerLink="/admin/experiences" class="action-card card">
          <div class="action-icon">
            <i class="fa-solid fa-briefcase"></i>
          </div>
          <div class="action-text">
            <h3>Gérer les Expériences</h3>
            <p>Mettre à jour votre parcours professionnel.</p>
          </div>
          <i class="fa-solid fa-chevron-right action-arrow"></i>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-header {
      margin-bottom: 2rem;
    }
    .dashboard-header h1 {
      margin-bottom: 0.5rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .stat-card {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
    }
    .stat-icon {
      width: 4rem;
      height: 4rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    .stat-content h3 {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1;
    }
    
    .quick-actions h2 {
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
    }
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .action-card {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      text-decoration: none;
      color: inherit;
    }
    .action-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: var(--bg-tertiary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      color: var(--accent-primary);
    }
    .action-text {
      flex-grow: 1;
    }
    .action-text h3 {
      font-size: 1.125rem;
      margin-bottom: 0.25rem;
    }
    .action-text p {
      font-size: 0.875rem;
      margin-bottom: 0;
    }
    .action-arrow {
      color: var(--text-tertiary);
      transition: transform 0.2s;
    }
    .action-card:hover .action-arrow {
      transform: translateX(4px);
      color: var(--accent-primary);
    }
    
    /* Dark mode adjustments */
    :global(.dark) .stat-icon {
      opacity: 0.8;
    }
  `]
})
export class AdminDashboardComponent {
  projetService = inject(ProjetService);
  competenceService = inject(CompetenceService);
  experienceService = inject(ExperienceService);
}
