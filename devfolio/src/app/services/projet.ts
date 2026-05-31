import { Injectable } from '@angular/core';
import { Projet } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjetService {

  private projets: Projet[] = [
    {
      id: 1,
      titre: 'TaskFlow',
      description: 'Application Kanban type Trello',
      technologies: ['Angular', 'RxJS'],
      githubUrl: 'https://github.com/ton-compte/taskflow',
      statut: 'publié',
      dateCreation: new Date('2026-03-15')
    },
    {
      id: 2,
      titre: 'ShopNow',
      description: 'Boutique en ligne avec panier',
      technologies: ['Angular', 'Node.js'],
      githubUrl: 'https://github.com/ton-compte/shopnow',
      statut: 'publié',
      dateCreation: new Date('2026-02-02')
    }
  ];

  getProjets(): Projet[] { return [...this.projets]; }

  getProjetById(id: number): Projet | undefined {
    return this.projets.find(p => p.id === id);
  }

  ajouterProjet(p: Projet): void { this.projets.push(p); }

  modifierProjet(p: Projet): void {
    const i = this.projets.findIndex(x => x.id === p.id);
    if (i !== -1) this.projets[i] = p;
  }

  supprimerProjet(id: number): void {
    this.projets = this.projets.filter(p => p.id !== id);
  }
}