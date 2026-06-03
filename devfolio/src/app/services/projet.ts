import { Injectable } from '@angular/core';
import { Projet } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjetService {

  private projets: Projet[] = [
    {
      id: 1,
      titre: 'DevFolio',
      description: 'Portfolio personnel avec pages, routing, formulaire de contact et espace admin.',
      technologies: ['Angular', 'TypeScript', 'Reactive Forms'],
      githubUrl: 'https://github.com/devfolio/devfolio',
      statut: 'publie',
      dateCreation: new Date('2026-05-20')
    },
    {
      id: 2,
      titre: 'Gestion Contacts',
      description: 'Application de gestion des contacts avec composants, service et formulaire.',
      technologies: ['Angular', 'Forms'],
      githubUrl: 'https://github.com/devfolio/gestion-contacts',
      statut: 'publie',
      dateCreation: new Date('2026-04-12')
    },
    {
      id: 3,
      titre: 'Catalogue App',
      description: 'Catalogue simple avec liste, detail, navigation et zone admin protegee.',
      technologies: ['Angular', 'Routing', 'Guards'],
      githubUrl: 'https://github.com/devfolio/catalogue-app',
      statut: 'publie',
      dateCreation: new Date('2026-03-28')
    },
    {
      id: 4,
      titre: 'Contact Manager',
      description: 'Mini application CRUD pour ajouter, modifier et supprimer des donnees.',
      technologies: ['Angular', 'Services'],
      githubUrl: 'https://github.com/devfolio/contact-manager',
      statut: 'brouillon',
      dateCreation: new Date('2026-02-18')
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
