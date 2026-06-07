import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';
import { CompetenceService } from '../../../services/competence.service';
import { ExperienceService } from '../../../services/experience.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  projetService = inject(ProjetService);
  competenceService = inject(CompetenceService);
  experienceService = inject(ExperienceService);
}
