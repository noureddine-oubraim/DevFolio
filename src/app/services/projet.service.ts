import { Injectable, signal, computed } from '@angular/core';
import { Projet } from '../models/types';
import { initialProjects } from '../data/mock-db';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private readonly STORAGE_KEY = 'devfolio_projects_v2';
  
  // State signal holding all projects
  private projects = signal<Projet[]>(this.loadProjects());

  // Computed signals for convenience
  public allProjects = computed(() => this.projects());
  public publishedProjects = computed(() => this.projects().filter(p => p.statut === 'Publié'));

  constructor() {}

  private loadProjects(): Projet[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Fallback to mock data if empty
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialProjects));
    return initialProjects;
  }

  private saveProjects(projects: Projet[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    this.projects.set(projects); // Update the signal
  }

  getProjectById(id: number): Projet | undefined {
    return this.projects().find(p => p.id === id);
  }

  addProject(projet: Omit<Projet, 'id'>): void {
    const currentProjects = this.projects();
    const newId = currentProjects.length > 0 ? Math.max(...currentProjects.map(p => p.id)) + 1 : 1;
    const newProject: Projet = { ...projet, id: newId };
    
    this.saveProjects([...currentProjects, newProject]);
  }

  updateProject(updatedProject: Projet): void {
    const currentProjects = this.projects();
    const index = currentProjects.findIndex(p => p.id === updatedProject.id);
    
    if (index !== -1) {
      const newProjects = [...currentProjects];
      newProjects[index] = updatedProject;
      this.saveProjects(newProjects);
    }
  }

  deleteProject(id: number): void {
    const newProjects = this.projects().filter(p => p.id !== id);
    this.saveProjects(newProjects);
  }

  getAllTechnologies(): string[] {
    const techs = new Set<string>();
    this.projects().forEach(p => {
      p.technologies.forEach(t => techs.add(t));
    });
    return Array.from(techs).sort();
  }
}
