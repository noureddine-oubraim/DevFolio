import { Component, inject, signal, computed } from '@angular/core';
import { LowerCasePipe, NgClass, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompetenceService } from '../../../services/competence.service';

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [NgClass, RouterLink, LowerCasePipe, SlicePipe],
  template: `
    <div class="competences-page">
      <!-- Page Hero -->
      <div class="page-hero">
        <div class="container">
          <div class="breadcrumb">
            <a routerLink="/accueil">Accueil</a>
            <i class="fa-solid fa-chevron-right"></i>
            <span>Compétences</span>
          </div>
          <h1>Mes <span class="accent">Compétences</span></h1>
          <p class="hero-sub">Un aperçu complet de mon arsenal technique, forgé à travers des projets réels et une formation continue.</p>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-bar">
        <div class="container filter-inner">
          @for (cat of categories; track cat.key) {
            <button class="filter-btn" [class.active]="activeCategory() === cat.key"
                    (click)="activeCategory.set(cat.key)">
              <i [ngClass]="cat.icon"></i> {{ cat.label }}
            </button>
          }
        </div>
      </div>

      <!-- Skills Grid -->
      <div class="container skills-container">
        <div class="skills-grid">
          @for (skill of filteredSkills(); track skill.id) {
            <div class="skill-card card" [attr.data-level]="skill.niveau">
              <div class="card-top">
                <div class="skill-icon" [ngClass]="'lvl-' + (skill.niveau | lowercase | slice:0:3)">
                  <i [ngClass]="skill.icone || 'fa-solid fa-code'"></i>
                </div>
                <span class="level-badge" [ngClass]="'badge-' + (skill.niveau | lowercase | slice:0:3)">
                  {{ skill.niveau }}
                </span>
              </div>
              <h3>{{ skill.nom }}</h3>
              <div class="progress-track">
                <div class="progress-fill" [ngClass]="'fill-' + (skill.niveau | lowercase | slice:0:3)"></div>
              </div>
              <span class="percent-label">
                @if (skill.niveau === 'Avancé') { 90% }
                @else if (skill.niveau === 'Intermédiaire') { 60% }
                @else { 30% }
              </span>
            </div>
          } @empty {
            <div class="empty-state">
              <i class="fa-solid fa-filter-circle-xmark"></i>
              <p>Aucune compétence dans cette catégorie.</p>
            </div>
          }
        </div>

        <!-- Stats Row -->
        <div class="stats-row">
          <div class="stat-card card">
            <div class="stat-number accent">{{ advancedCount() }}</div>
            <div class="stat-label">Compétences Avancées</div>
          </div>
          <div class="stat-card card">
            <div class="stat-number accent">{{ intermediateCount() }}</div>
            <div class="stat-label">Niveau Intermédiaire</div>
          </div>
          <div class="stat-card card">
            <div class="stat-number accent">{{ beginnerCount() }}</div>
            <div class="stat-label">En Apprentissage</div>
          </div>
          <div class="stat-card card">
            <div class="stat-number accent">{{ totalSkills() }}</div>
            <div class="stat-label">Total Compétences</div>
          </div>
        </div>
      </div>

      <!-- Extra Sections -->
      <div class="extra-section">
        <div class="container">
          <div class="extras-grid">
            <!-- Méthodes & Outils -->
            <div class="extra-card card" style="grid-column: 1 / -1; margin-bottom: 0.5rem;">
              <h3><i class="fa-solid fa-screwdriver-wrench"></i> Méthodes & Outils</h3>
              <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;">
                <strong>Gestion de projet Agile</strong> – Utilisation de Jira pour le suivi des sprints, la gestion des tâches et le travail collaboratif au sein d’une équipe de développement.
              </p>
            </div>
            
            <!-- Qualités -->
            <div class="extra-card card">
              <h3><i class="fa-solid fa-star"></i> Qualités Personnelles</h3>
              <div class="tags-wrap">
                @for (q of softSkills; track q) {
                  <span class="extra-tag">{{ q }}</span>
                }
              </div>
            </div>
            <!-- Langues -->
            <div class="extra-card card">
              <h3><i class="fa-solid fa-language"></i> Langues</h3>
              <div class="lang-list">
                @for (lang of languages; track lang.name) {
                  <div class="lang-item">
                    <span class="lang-flag">{{ lang.flag }}</span>
                    <div class="lang-info">
                      <span class="lang-name">{{ lang.name }}</span>
                      <span class="lang-lvl">{{ lang.level }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
            <!-- Centres d'intérêt -->
            <div class="extra-card card">
              <h3><i class="fa-solid fa-heart"></i> Centres d'Intérêt</h3>
              <div class="interests-grid">
                @for (interest of interests; track interest.label) {
                  <div class="interest-item">
                    <i [ngClass]="interest.icon"></i>
                    <span>{{ interest.label }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .competences-page {
      min-height: 100vh;
    }
    /* Hero */
    .page-hero {
      background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
      padding: 4rem 0 3rem;
      border-bottom: 1px solid var(--border-color);
    }
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-tertiary);
      margin-bottom: 1.5rem;
    }
    .breadcrumb a {
      color: var(--accent-primary);
      font-weight: 500;
    }
    .breadcrumb i {
      font-size: 0.7rem;
    }
    .page-hero h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      margin-bottom: 1rem;
    }
    .hero-sub {
      color: var(--text-secondary);
      font-size: 1.1rem;
      max-width: 600px;
    }
    .accent { color: var(--accent-primary); }

    /* Filter bar */
    .filter-bar {
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 4rem;
      z-index: 30;
      padding: 0.75rem 0;
    }
    .filter-inner {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .filter-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.45rem 1rem;
      border-radius: 9999px;
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-secondary);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .filter-btn:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }
    .filter-btn.active {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: white;
    }

    /* Skills grid */
    .skills-container {
      padding-top: 3rem;
      padding-bottom: 1rem;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .skill-card {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .skill-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .skill-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
    }
    .lvl-ava { background: rgba(99, 102, 241, 0.15); color: #6366f1; }
    .lvl-int { background: rgba(16, 185, 129, 0.15); color: #10b981; }
    .lvl-déb { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
    .level-badge {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      text-transform: uppercase;
    }
    .badge-ava { background: rgba(99, 102, 241, 0.15); color: #6366f1; }
    .badge-int { background: rgba(16, 185, 129, 0.15); color: #10b981; }
    .badge-déb { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
    .skill-card h3 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }
    .progress-track {
      height: 5px;
      background: var(--border-color);
      border-radius: 9999px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 9999px;
      transition: width 0.6s ease;
    }
    .fill-ava { width: 90%; background: #6366f1; }
    .fill-int { width: 60%; background: #10b981; }
    .fill-déb { width: 30%; background: #f59e0b; }
    .percent-label {
      font-size: 0.75rem;
      color: var(--text-tertiary);
      font-weight: 600;
      text-align: right;
    }

    /* Stats Row */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .stat-card {
      text-align: center;
      padding: 1.5rem;
    }
    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 0.5rem;
    }
    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    /* Extra sections */
    .extra-section {
      background: var(--bg-tertiary);
      padding: 3rem 0;
      border-top: 1px solid var(--border-color);
    }
    .extras-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .extra-card {
      padding: 1.75rem;
    }
    .extra-card h3 {
      font-size: 1.1rem;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      color: var(--text-primary);
    }
    .extra-card h3 i {
      color: var(--accent-primary);
    }
    .tags-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .extra-tag {
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
    .lang-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .lang-item {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }
    .lang-flag {
      font-size: 1.75rem;
    }
    .lang-info {
      display: flex;
      flex-direction: column;
    }
    .lang-name {
      font-weight: 600;
      font-size: 0.95rem;
    }
    .lang-lvl {
      font-size: 0.8rem;
      color: var(--accent-primary);
      font-weight: 500;
    }
    .interests-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }
    .interest-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
    .interest-item i {
      color: var(--accent-primary);
      width: 1.25rem;
      text-align: center;
    }
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      color: var(--text-tertiary);
    }
    .empty-state i {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }
  `]
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

  // Category mapping
  private categoryMap: Record<string, string[]> = {
    framework: ['Angular', 'JavaScript / React', 'Node.js', 'HTML / CSS / PHP'],
    language: ['Java', 'C / C++', 'TypeScript', 'Powershell', 'Algorithmique & Structures de données', 'Programmation système'],
    database: ['Bases de données / SQL'],
    tool: ['UML & Modélisation', 'Git & GitHub', 'Agile / Jira', 'Docker'],
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
    { flag: '🇫🇷', name: 'Français', level: 'Intermédiaire' },
    { flag: '🇬🇧', name: 'Anglais', level: 'Intermédiaire' },
  ];

  interests = [
    { icon: 'fa-regular fa-futbol', label: 'Football' },
    { icon: 'fa-solid fa-person-running', label: 'Course à pied' },
    { icon: 'fa-solid fa-dumbbell', label: 'Musculation' }
  ];
}
