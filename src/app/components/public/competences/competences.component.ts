import { Component, inject, signal } from '@angular/core';
import { LowerCasePipe, NgClass, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompetenceService } from '../../../services/competence.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [NgClass, RouterLink, LowerCasePipe, SlicePipe],
  templateUrl: './competences.component.html',
  styleUrl: './competences.component.css'
})
export class CompetencesComponent {
  private competenceService = inject(CompetenceService);
  private profileService = inject(ProfileService);

  activeCategory = signal<string>('all');

  categories = [
    { key: 'all', label: 'Toutes', icon: 'fa-solid fa-grip' },
    { key: 'framework', label: 'Frameworks', icon: 'fa-brands fa-angular' },
    { key: 'language', label: 'Langages', icon: 'fa-solid fa-code' },
    { key: 'database', label: 'Bases de données', icon: 'fa-solid fa-database' },
    { key: 'tool', label: 'Outils & Méthodes', icon: 'fa-solid fa-screwdriver-wrench' },
  ];

  // Category mapping — exact skill names, one entry per card
  private categoryMap: Record<string, string[]> = {
    framework: ['Angular', 'React', 'Spring Boot', 'Node.js'],
    language: ['Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'HTML & CSS', 'PHP', 'Powershell'],
    database: ['SQL', 'MongoDB'],
    tool: ['UML & Modélisation', 'Git & GitHub', 'Agile / Jira', 'Docker', 'Algorithmique & Structures de données', 'Programmation système', 'Scrum', 'Kanban'],
  };

  get filteredSkills() {
    const cat = this.activeCategory();
    const all = this.competenceService.allSkills;
    if (cat === 'all') return all;
    const names = this.categoryMap[cat] || [];
    // Exact match only — prevents 'Java' from bleeding into 'JavaScript'
    return all.filter(s => names.some(n => s.nom.toLowerCase() === n.toLowerCase()));
  }

  get totalSkills(): number {
    return this.competenceService.allSkills.length;
  }

  get advancedCount(): number {
    return this.competenceService.allSkills.filter(s => s.niveau === 'Avancé').length;
  }

  get intermediateCount(): number {
    return this.competenceService.allSkills.filter(s => s.niveau === 'Intermédiaire').length;
  }

  get beginnerCount(): number {
    return this.competenceService.allSkills.filter(s => s.niveau === 'Débutant').length;
  }

  get softSkills() {
    return this.profileService.softSkills;
  }

  get languages() {
    return this.profileService.spokenLanguages;
  }

  get interests() {
    return this.profileService.interests;
  }
}
