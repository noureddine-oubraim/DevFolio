import { Injectable } from '@angular/core';
import { Competence } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class CompetenceService {
  private competences: Competence[] = [
    { id: 1, nom: 'Angular', categorie: 'frontend', niveau: 80, pourcentage: 80 },
    { id: 2, nom: 'TypeScript', categorie: 'frontend', niveau: 75, pourcentage: 75 },
    { id: 3, nom: 'Reactive Forms', categorie: 'frontend', niveau: 70, pourcentage: 70 },
    { id: 4, nom: 'Routing', categorie: 'frontend', niveau: 75, pourcentage: 75 },
    { id: 5, nom: 'Node.js', categorie: 'backend', niveau: 60, pourcentage: 60 },
    { id: 6, nom: 'Git', categorie: 'outils', niveau: 75, pourcentage: 75 },
  ];

  getCompetences(): Competence[] {
    return [...this.competences];
  }

  ajouterCompetence(c: Competence): void {
    this.competences.push(c);
  }

  modifierCompetence(c: Competence): void {
    const i = this.competences.findIndex(x => x.id === c.id);
    if (i !== -1) this.competences[i] = c;
  }

  supprimerCompetence(id: number): void {
    this.competences = this.competences.filter(c => c.id !== id);
  }
}
