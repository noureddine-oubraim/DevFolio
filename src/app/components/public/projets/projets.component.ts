

import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjetService } from '../../../services/projet.service';
import { Projet } from '../../../models/types';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SlicePipe],
  template: `
    <div class="container page-container">
      <div class="page-header">
        <h1>All Projects</h1>
        <p>A collection of my recent work, side projects, and experiments.</p>
      </div>
      <div class="filter-bar card">
        <div class="input-group" style="margin-bottom: 0;">
          <label for="techFilter">Filter by Technology:</label>
          <select id="techFilter" class="input-control" [(ngModel)]="selectedTech">
            <option value="">All Technologies</option>
            @for (tech of projetService.getAllTechnologies(); track tech) {
              <option [value]="tech">{{ tech }}</option>
            }
          </select>
        </div>
      </div>

      <div class="projects-grid">
        @for (project of filteredProjects(); track project.id) {
          <div class="card project-card">
            <div class="project-tags">
              @for (tech of project.technologies; track tech) {
                <span class="tech-tag" [class.active-tag]="tech === selectedTech()">{{ tech }}</span>
              }
            </div>
            <h3>{{ project.titre }}</h3>
            <p class="project-desc">{{ project.description | slice:0:120 }}...</p>
            <a [routerLink]="['/projet', project.id]" class="project-link">
              View Details <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        } @empty {
          <div class="empty-state">
            <i class="fa-regular fa-folder-open"></i>
            <h3>No projects found</h3>
            <p>Try adjusting your filter to see more projects.</p>
            <button class="btn btn-outline" (click)="selectedTech.set('')">Clear Filter</button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 4rem 1.5rem;
    }
    .page-header {
      margin-bottom: 3rem;
    }
    .filter-bar {
      margin-bottom: 3rem;
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
    }
    .filter-bar .input-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      max-width: 400px;
    }
    .filter-bar label {
      margin-bottom: 0;
      white-space: nowrap;
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
    .active-tag {
      background-color: var(--accent-primary);
      color: white;
      border-color: var(--accent-primary);
    }
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem 2rem;
      background-color: var(--bg-secondary);
      border-radius: 0.5rem;
      border: 1px dashed var(--border-color);
    }
    .empty-state i {
      font-size: 3rem;
      color: var(--text-tertiary);
      margin-bottom: 1rem;
    }
    .empty-state h3 {
      margin-bottom: 0.5rem;
    }
    .empty-state p {
      margin-bottom: 1.5rem;
    }
  `]
})
export class ProjetsComponent {
  projetService = inject(ProjetService);
  
  selectedTech = signal<string>('');

  filteredProjects = computed(() => {
    const tech = this.selectedTech();
    const published = this.projetService.publishedProjects();
    
    if (!tech) {
      return published;
    }
    
    return published.filter((p: Projet) => p.technologies.includes(tech));
  });
}
