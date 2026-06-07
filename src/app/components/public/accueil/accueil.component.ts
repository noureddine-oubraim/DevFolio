import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompetenceService } from '../../../services/competence.service';
import { ProjetService } from '../../../services/projet.service';
import { ExperienceService } from '../../../services/experience.service';
import { CommonModule, NgClass } from '@angular/common';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterLink, NgClass, TruncatePipe],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  competenceService = inject(CompetenceService);
  projetService = inject(ProjetService);
  experienceService = inject(ExperienceService);
}
