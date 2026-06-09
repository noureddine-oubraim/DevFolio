import { Component, inject, signal, computed } from '@angular/core';
import { LowerCasePipe, NgClass, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompetenceService } from '../../../services/competence.service';

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [NgClass, RouterLink, LowerCasePipe, SlicePipe],
  templateUrl: './competences.component.html',
  styleUrl: './competences.component.css'
})
export class CompetencesComponent {
  private competenceService = inject(CompetenceService);

  activeCategory = signal<string>('all');

  categories = [
    { key: 'all', label: 'Toutes', icon: 'fa-solid fa-grip' },
    { key: 'framework', label: 'Frameworks', icon: 'fa-brands fa-angular' },
    { key: 'language', label: 'Langages', icon: 'fa-solid fa-code' },
    { key: 'database', label: 'Bases de données', icon: 'fa-solid fa-database' },
    { key: 'tool', label: 'Outils & Méthodes', icon: 'fa-solid fa-screwdriver-wrench' },
  ];

  // Category mapping – properly classifying each skill
  private categoryMap: Record<string, string[]> = {
    framework: ['Angular', 'JavaScript / React', 'Node.js', 'Spring Boot'],
    language: ['Java', 'C / C++', 'TypeScript', 'HTML / CSS / PHP', 'Powershell'],
    database: ['Bases de données / SQL', 'MongoDB'],
    tool: ['UML & Modélisation', 'Git & GitHub', 'Agile / Jira', 'Docker', 'Algorithmique & Structures de données', 'Programmation système', 'Scrum', 'Kanban'],
  };

  filteredSkills = computed(() => {
    const cat = this.activeCategory();
    const all = this.competenceService.allSkills();
    if (cat === 'all') return all;
    const names = this.categoryMap[cat] || [];
    return all.filter(s => names.some(n => s.nom.toLowerCase().includes(n.toLowerCase()) || n.toLowerCase().includes(s.nom.toLowerCase())));
  });

  totalSkills = computed(() => this.competenceService.allSkills().length);
  advancedCount = computed(() => this.competenceService.allSkills().filter(s => s.niveau === 'Avancé').length);
  intermediateCount = computed(() => this.competenceService.allSkills().filter(s => s.niveau === 'Intermédiaire').length);
  beginnerCount = computed(() => this.competenceService.allSkills().filter(s => s.niveau === 'Débutant').length);

  softSkills = [
    'Organisation', 'Communication', 'Travail d\'équipe', 
    'Respect des délais', 'Esprit critique'
  ];

  languages = [
    { flag: '🇲🇦', name: 'Arabe', level: 'Langue maternelle' },
    { flag: '🇫🇷', name: 'Français', level: 'Avancé' },
    { flag: '🇬🇧', name: 'Anglais', level: 'Avancé' },
  ];

  interests = [
    { icon: 'fa-solid fa-microphone', label: 'Chant' },
    { icon: 'fa-solid fa-book-open-reader', label: 'Lecture' },
    { icon: 'fa-solid fa-plane-departure', label: 'Voyage' },
    { icon: 'fa-solid fa-palette', label: 'Art & Créativité' },
    { icon: 'fa-solid fa-music', label: 'Musique' }
  ];
}
