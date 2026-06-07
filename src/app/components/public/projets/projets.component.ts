import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';
import { Projet } from '../../../models/types';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { HighlightDirective } from '../../../directives/highlight.directive';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe, HighlightDirective],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.css'
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
