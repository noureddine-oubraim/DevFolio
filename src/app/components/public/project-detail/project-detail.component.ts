import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProjetService } from '../../../services/projet.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  private projetService = inject(ProjetService);

  id = input<string>();

  projet = computed(() => {
    const projectId = +(this.id() ?? 0);
    if (!projectId) return undefined;
    return this.projetService.projects().find(p => p.id === projectId);
  });
}
