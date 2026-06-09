import { Injectable, signal } from '@angular/core';
import { Competence } from '../models/types';
import { initialSkills } from '../data/mock-db';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  private readonly STORAGE_KEY = 'devfolio_skills_v5';
  
  // State signal holding all skills
  private skills = signal<Competence[]>(this.loadSkills());

  get allSkills(): Competence[] {
    return this.skills();
  }

  constructor() {}

  private loadSkills(): Competence[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try { return JSON.parse(data); } catch { /* corrupted — fall through */ }
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialSkills));
    return initialSkills;
  }

  private saveSkills(skills: Competence[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(skills));
    this.skills.set(skills); // Update the signal
  }

  addSkill(skill: Omit<Competence, 'id'>): void {
    const currentSkills = this.skills();
    const newId = currentSkills.length > 0 ? Math.max(...currentSkills.map(s => s.id)) + 1 : 1;
    const newSkill: Competence = { ...skill, id: newId };
    
    this.saveSkills([...currentSkills, newSkill]);
  }

  updateSkill(updatedSkill: Competence): void {
    const currentSkills = this.skills();
    const index = currentSkills.findIndex(s => s.id === updatedSkill.id);
    
    if (index !== -1) {
      const newSkills = [...currentSkills];
      newSkills[index] = updatedSkill;
      this.saveSkills(newSkills);
    }
  }

  deleteSkill(id: number): void {
    const newSkills = this.skills().filter(s => s.id !== id);
    this.saveSkills(newSkills);
  }
}
