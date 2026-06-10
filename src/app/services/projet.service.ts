import { Injectable, signal } from '@angular/core';
import { Projet } from '../models/types';
import { initialProjects, PROJECTS_DB_VERSION } from '../data/mock-db';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private readonly STORAGE_KEY = 'devfolio_projects';

  private readonly _projects = signal<Projet[]>(this.loadProjects());
  readonly projects = this._projects.asReadonly();

  get allProjects(): Projet[] {
    return this._projects();
  }

  get publishedProjects(): Projet[] {
    return this.projects().filter(p => p.statut === 'Publié');
  }

  constructor() {}

  private loadProjects(): Projet[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { v?: number; data?: Projet[] };
        if (parsed.v === PROJECTS_DB_VERSION && Array.isArray(parsed.data)) {
          return parsed.data;
        }
      } catch {
        /* données invalides — réinitialiser depuis la mock DB */
      }
    }

    const projects = [...initialProjects];
    this.persist(projects);
    return projects;
  }

  private persist(projects: Projet[]): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify({ v: PROJECTS_DB_VERSION, data: projects })
    );
  }

  private saveProjects(projects: Projet[]): void {
    this.persist(projects);
    this._projects.set(projects);
  }

  getProjectById(id: number): Projet | undefined {
    return this._projects().find(p => p.id === id);
  }

  addProject(projet: Omit<Projet, 'id'>): void {
    const current = this._projects();
    const newId = current.length > 0 ? Math.max(...current.map(p => p.id)) + 1 : 1;
    this.saveProjects([...current, { ...projet, id: newId }]);
  }

  updateProject(updated: Projet): void {
    const current = this._projects();
    const idx = current.findIndex(p => p.id === updated.id);
    if (idx !== -1) {
      const next = [...current];
      next[idx] = updated;
      this.saveProjects(next);
    }
  }

  deleteProject(id: number): void {
    this.saveProjects(this._projects().filter(p => p.id !== id));
  }

  getAllTechnologies(): string[] {
    const techs = new Set<string>();
    this._projects().forEach(p => p.technologies.forEach(t => techs.add(t)));
    return Array.from(techs).sort();
  }
}
