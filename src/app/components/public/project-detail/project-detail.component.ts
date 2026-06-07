import { Component, inject, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
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
