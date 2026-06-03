import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Competence } from '../../models/project.model';
import { CompetenceService } from '../../services/competence';

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competences.html',
  styleUrls: ['./competences.css'],
})
export class Competences {
  competences: Competence[] = [];

  constructor(private competenceService: CompetenceService) {
    this.competences = this.competenceService.getCompetences();
  }
}
