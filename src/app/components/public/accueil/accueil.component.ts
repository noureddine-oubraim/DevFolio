import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompetenceService } from '../../../services/competence.service';
import { ProjetService } from '../../../services/projet.service';
import { ExperienceService } from '../../../services/experience.service';
import { CommonModule, NgClass, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterLink, NgClass, SlicePipe],
  template: `
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-text">
          <span class="badge badge-published" style="margin-bottom: 1rem;">Disponible pour de nouveaux projets</span>
          <h1>Bonjour, je suis <span style="color: var(--accent-primary)">Noureddine Oubraim</span>.</h1>
          <p class="hero-description">
            Développeur Full-Stack passionné par la création d'applications web performantes, robustes et élégantes. 
            Je combine rigueur technique et design soigné pour offrir des expériences utilisateur mémorables.
          </p>
          <div class="hero-actions">
            <a routerLink="/projets" class="btn btn-primary">Voir les Projets</a>
            <a routerLink="/contact" class="btn btn-outline">Me Contacter</a>
          </div>
        </div>
      </div>
    </section>

    <section id="competences" class="skills-section">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title" style="margin-bottom: 0;">Mes Compétences</h2>
            <p style="margin-bottom: 0;">Un aperçu de mes principales compétences techniques.</p>
          </div>
          <a routerLink="/competences" class="btn btn-outline">Toutes mes compétences</a>
        </div>
        
        <div class="skills-grid">
          @for (skill of competenceService.allSkills().slice(0, 3); track skill.id) {
            <div class="card skill-card">
              <div class="skill-icon">
                <i [ngClass]="skill.icone || 'fa-solid fa-code'"></i>
              </div>
              <h3 class="skill-name">{{ skill.nom }}</h3>
              <div class="skill-level-bar">
                <div class="skill-level-fill" [ngClass]="skill.niveau | lowercase"></div>
              </div>
              <div class="skill-footer">
                <span class="skill-level-text">{{ skill.niveau }}</span>
              </div>
            </div>
          } @empty {
            <p>Aucune compétence enregistrée.</p>
          }
        </div>
      </div>
    </section>

    <section class="projects-section">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title" style="margin-bottom: 0;">Projets Récents</h2>
            <p style="margin-bottom: 0;">Un aperçu de mes travaux récents et contributions techniques.</p>
          </div>
          <a routerLink="/projets" class="btn btn-outline">Tout afficher</a>
        </div>
        
        <div class="projects-grid">
          @for (project of projetService.publishedProjects().slice(0, 3); track project.id) {
            <div class="card project-card">
              <div class="project-tags">
                @for (tech of project.technologies.slice(0, 3); track tech) {
                  <span class="tech-tag">{{ tech }}</span>
                }
              </div>
              <h3>{{ project.titre }}</h3>
              <p class="project-desc">{{ project.description | slice:0:100 }}...</p>
              <a [routerLink]="['/projet', project.id]" class="project-link">
                Détails du projet <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          } @empty {
            <p>Aucun projet publié pour le moment.</p>
          }
        </div>
      </div>
    </section>

    <section class="experience-section">
      <div class="container">
        <h2 class="section-title">Expérience Professionnelle</h2>
        <div class="timeline">
          @for (exp of experienceService.allExperiences(); track exp.id) {
            <div class="timeline-item card">
              <div class="timeline-badge"><i class="fa-solid fa-briefcase"></i></div>
              <div class="timeline-header">
                <h3>{{ exp.titre }}</h3>
                <span class="period">{{ exp.dateDebut }} &mdash; {{ exp.dateFin }}</span>
              </div>
              <div class="company-name">{{ exp.entreprise }}</div>
              <p class="job-desc">{{ exp.description }}</p>
            </div>
          } @empty {
            <p class="empty-state-text">Aucune expérience enregistrée.</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: 6rem 0;
      text-align: left;
    }
    .hero-description {
      font-size: 1.125rem;
      max-width: 600px;
      margin-bottom: 2rem;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
    }
    
    .section-title {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
    }
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 3rem;
      height: 2px;
      background-color: var(--accent-primary);
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2rem;
    }
    .section-header .section-title {
      text-align: left;
      margin-bottom: 0.5rem;
    }
    .section-header .section-title::after {
      display: none;
    }

    .skills-section {
      background-color: var(--bg-tertiary);
      padding: 5rem 0;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .skill-card {
      text-align: left;
    }
    .skill-icon {
      font-size: 2rem;
      color: var(--accent-primary);
      margin-bottom: 1rem;
      background: var(--bg-tertiary);
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
    }
    .skill-level-bar {
      height: 6px;
      background-color: var(--border-color);
      border-radius: 3px;
      margin: 1rem 0 0.5rem;
      overflow: hidden;
    }
    .skill-level-fill {
      height: 100%;
      background-color: var(--accent-primary);
    }
    .skill-level-fill.débutant { width: 33%; }
    .skill-level-fill.intermédiaire { width: 66%; }
    .skill-level-fill.avancé { width: 100%; }
    
    .skill-footer {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-tertiary);
      font-weight: 500;
    }

    .projects-section {
      padding: 5rem 0;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }
    .project-card {
      display: flex;
      flex-direction: column;
    }
    .project-desc {
      flex-grow: 1;
    }
    .project-link {
      color: var(--accent-primary);
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .project-link:hover {
      color: var(--accent-hover);
    }

    .experience-section {
      background-color: var(--bg-tertiary);
      padding: 5rem 0;
    }
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
      position: relative;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 1.5rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: var(--border-color);
    }
    .timeline-item {
      position: relative;
      margin-left: 3.5rem;
      padding: 2rem;
    }
    .timeline-item:hover {
      transform: none;
    }
    .timeline-badge {
      position: absolute;
      left: -3rem;
      top: 2rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: var(--accent-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      z-index: 10;
    }
    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.5rem;
    }
    .timeline-header h3 {
      font-size: 1.25rem;
      margin-bottom: 0;
    }
    .period {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      font-weight: 500;
    }
    .company-name {
      color: var(--accent-primary);
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .job-desc {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 0;
    }
  `]
})
export class AccueilComponent {
  competenceService = inject(CompetenceService);
  projetService = inject(ProjetService);
  experienceService = inject(ExperienceService);
}

