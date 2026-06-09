import { Component, inject, signal, computed } from '@angular/core';
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

  filteredSkills = computed(() => {
    const cat = this.activeCategory();
    const all = this.competenceService.allSkills();
    if (cat === 'all') return all;
    const names = this.categoryMap[cat] || [];
    // Exact match only — prevents 'Java' from bleeding into 'JavaScript'
    return all.filter(s => names.some(n => s.nom.toLowerCase() === n.toLowerCase()));
  });

  totalSkills = computed(() => this.competenceService.allSkills().length);
  advancedCount = computed(() => this.competenceService.allSkills().filter(s => s.niveau === 'Avancé').length);
  intermediateCount = computed(() => this.competenceService.allSkills().filter(s => s.niveau === 'Intermédiaire').length);
  beginnerCount = computed(() => this.competenceService.allSkills().filter(s => s.niveau === 'Débutant').length);

  softSkills = this.profileService.softSkills;
  languages = this.profileService.spokenLanguages;
  interests = this.profileService.interests;
}
