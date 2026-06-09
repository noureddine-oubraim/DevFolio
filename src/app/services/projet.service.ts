import { Injectable, signal } from '@angular/core';
import { Projet } from '../models/types';
import { initialProjects, PROJECTS_DB_VERSION } from '../data/mock-db';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private readonly STORAGE_KEY = 'devfolio_projects';

  private projects = signal<Projet[]>(this.loadProjects());

  get allProjects(): Projet[] {
    return this.projects();
  }

  get publishedProjects(): Projet[] {
    return this.projects().filter(p => p.statut === 'Publié');
  }

  constructor() {}

  private loadProjects(): Projet[] {
    // Always start from the source of truth — clears any stale localStorage data
    Object.keys(localStorage)
      .filter(k => k.startsWith('devfolio_projects'))
      .forEach(k => localStorage.removeItem(k));

    return [...initialProjects];
  }

  private persist(projects: Projet[]): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify({ v: PROJECTS_DB_VERSION, data: projects })
    );
  }

  private saveProjects(projects: Projet[]): void {
    this.persist(projects);
    this.projects.set(projects);
  }

  getProjectById(id: number): Projet | undefined {
    return this.projects().find(p => p.id === id);
  }

  addProject(projet: Omit<Projet, 'id'>): void {
    const current = this.projects();
    const newId = current.length > 0 ? Math.max(...current.map(p => p.id)) + 1 : 1;
    this.saveProjects([...current, { ...projet, id: newId }]);
  }

  updateProject(updated: Projet): void {
    const current = this.projects();
    const idx = current.findIndex(p => p.id === updated.id);
    if (idx !== -1) {
      const next = [...current];
      next[idx] = updated;
      this.saveProjects(next);
    }
  }

  deleteProject(id: number): void {
    this.saveProjects(this.projects().filter(p => p.id !== id));
  }

  getAllTechnologies(): string[] {
    const techs = new Set<string>();
    this.projects().forEach(p => p.technologies.forEach(t => techs.add(t)));
    return Array.from(techs).sort();
  }
}
