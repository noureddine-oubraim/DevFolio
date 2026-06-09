import { Injectable, signal } from '@angular/core';
import { Experience } from '../models/types';
import { initialExperiences } from '../data/mock-db';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private readonly STORAGE_KEY = 'devfolio_experiences_v3';
  
  // State signal holding all experiences
  private experiences = signal<Experience[]>(this.loadExperiences());

  get allExperiences(): Experience[] {
    return this.experiences();
  }

  constructor() {}

  private loadExperiences(): Experience[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try { return JSON.parse(data); } catch { /* corrupted — fall through */ }
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialExperiences));
    return initialExperiences;
  }

  private saveExperiences(exps: Experience[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(exps));
    this.experiences.set(exps); // Update the signal
  }

  addExperience(exp: Omit<Experience, 'id'>): void {
    const current = this.experiences();
    const newId = current.length > 0 ? Math.max(...current.map(e => e.id)) + 1 : 1;
    const newExp: Experience = { ...exp, id: newId };
    
    this.saveExperiences([...current, newExp]);
  }

  updateExperience(updatedExp: Experience): void {
    const current = this.experiences();
    const index = current.findIndex(e => e.id === updatedExp.id);
    
    if (index !== -1) {
      const newExps = [...current];
      newExps[index] = updatedExp;
      this.saveExperiences(newExps);
    }
  }

  deleteExperience(id: number): void {
    const newExps = this.experiences().filter(e => e.id !== id);
    this.saveExperiences(newExps);
  }
}
