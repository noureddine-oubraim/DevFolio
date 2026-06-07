# Rapport Technique de Projet
## DevFolio — Portfolio Développeur avec Angular

---

| | |
|---|---|
| **Matière** | Développement Web avec Angular |
| **Encadrant** | Pr. CHAKRI Sana |
| **Filière** | ILISI1 |
| **Année académique** | 2025 – 2026 |
| **Étudiants** | Noureddine Oubraim · Nassima Bennour |
| **Date de soumission** | Juin 2026 |

---

## Table des matières

1. [Introduction](#1-introduction)
2. [Présentation du projet](#2-présentation-du-projet)
3. [Architecture technique](#3-architecture-technique)
4. [Structure du projet](#4-structure-du-projet)
5. [Fonctionnalités implémentées](#5-fonctionnalités-implémentées)
6. [Concepts Angular mis en œuvre](#6-concepts-angular-mis-en-œuvre)
7. [Gestion des données](#7-gestion-des-données)
8. [Sécurité et navigation](#8-sécurité-et-navigation)
9. [Difficultés rencontrées et solutions adoptées](#9-difficultés-rencontrées-et-solutions-adoptées)
10. [Conclusion](#10-conclusion)

---

## 1. Introduction

Ce rapport présente le projet **DevFolio**, réalisé dans le cadre du module de développement web avec Angular (ILISI1). L'objectif du projet est de concevoir et développer un portfolio de développeur complet en utilisant le framework Angular dans sa version la plus récente (Angular 20), en appliquant les concepts vus en cours sur l'ensemble des séances.

Le projet se divise en deux espaces distincts :

- Une **vitrine publique** permettant aux visiteurs de découvrir les projets, compétences, expériences et informations de contact du développeur.
- Un **back-office administrateur** protégé par authentification, offrant une gestion complète du contenu (CRUD) sans recours à un serveur externe.

---

## 2. Présentation du projet

### 2.1 Contexte et objectifs

DevFolio répond au cahier des charges du projet binôme Angular fourni par l'encadrant. Les six exigences fonctionnelles spécifiées dans le brief sont :

| # | Exigence | Statut |
|---|---|---|
| 1 | Interface publique : compétences, projets, contact | ✅ Réalisé |
| 2 | Page détail d'un projet avec technologies et lien GitHub | ✅ Réalisé |
| 3 | Formulaire de contact avec validation (envoi simulé) | ✅ Réalisé |
| 4 | Back-office protégé par authentification simulée | ✅ Réalisé |
| 5 | CRUD complet sur projets et compétences depuis l'admin | ✅ Réalisé |
| 6 | Filtrage des projets par technologie | ✅ Réalisé |

En plus de ces exigences de base, deux modules supplémentaires ont été intégrés : la **gestion des expériences professionnelles** et la **boîte de réception des messages** dans l'espace admin.

### 2.2 Technologies utilisées

| Technologie | Version | Rôle |
|---|---|---|
| Angular | 20 | Framework principal |
| TypeScript | 5.x | Langage de développement |
| CSS3 | — | Mise en forme des composants |
| Font Awesome | 6.x | Bibliothèque d'icônes |
| localStorage | Web API | Persistance des données (côté client) |

---

## 3. Architecture technique

### 3.1 Architecture générale

L'application suit une **architecture par composants standalone**, introduite à partir d'Angular 14 et consolidée en Angular 17+. Chaque composant est autonome et déclare ses propres dépendances dans son décorateur `@Component`.

La gestion d'état repose entièrement sur les **signaux Angular** (`signal`, `computed`, `effect`), en lieu et place de l'approche traditionnelle basée sur RxJS. Ce choix permet une réactivité fine et une meilleure lisibilité du code.

### 3.2 Séparation des responsabilités

L'application respecte le principe de séparation des responsabilités :

- Les **composants** gèrent uniquement l'affichage et les interactions utilisateur.
- Les **services** centralisent la logique métier, la gestion d'état et la persistance des données.
- Les **modèles** (interfaces TypeScript) définissent les structures de données partagées.
- Les **guards** contrôlent l'accès aux routes protégées.

### 3.3 Détection de changements sans Zone.js

L'application utilise `provideZonelessChangeDetection()` dans la configuration principale, ce qui désactive Zone.js et confie la détection de changements entièrement aux signaux. Cette configuration correspond à l'approche recommandée pour les nouvelles applications Angular modernes.

---

## 4. Structure du projet

```
src/
└── app/
    ├── components/
    │   ├── admin/
    │   │   ├── admin-dashboard/       ← Tableau de bord admin
    │   │   ├── admin-experiences/     ← CRUD expériences
    │   │   ├── admin-layout/          ← Mise en page admin (sidebar)
    │   │   ├── admin-login/           ← Formulaire de connexion
    │   │   ├── admin-messages/        ← Boîte de réception
    │   │   ├── admin-projects/        ← CRUD projets
    │   │   └── admin-skills/          ← CRUD compétences
    │   ├── layout/
    │   │   ├── footer/                ← Pied de page public
    │   │   ├── header/                ← En-tête public avec navigation
    │   │   └── public-layout/         ← Mise en page publique
    │   └── public/
    │       ├── accueil/               ← Page d'accueil
    │       ├── competences/           ← Liste des compétences
    │       ├── contact/               ← Formulaire de contact
    │       ├── landing/               ← Page de démarrage (choix visiteur/admin)
    │       ├── page-introuvable/      ← Page 404
    │       ├── project-detail/        ← Détail d'un projet
    │       └── projets/               ← Liste des projets avec filtre
    ├── data/
    │   └── mock-db.ts                 ← Données initiales (seed)
    ├── directives/
    │   └── highlight.directive.ts     ← Directive personnalisée
    ├── guards/
    │   └── auth.guard.ts              ← Guard d'authentification
    ├── models/
    │   └── types.ts                   ← Interfaces TypeScript
    ├── pipes/
    │   └── truncate.pipe.ts           ← Pipe personnalisé
    └── services/
        ├── auth.service.ts            ← Authentification simulée
        ├── competence.service.ts      ← Gestion des compétences
        ├── experience.service.ts      ← Gestion des expériences
        ├── message.service.ts         ← Gestion des messages
        ├── projet.service.ts          ← Gestion des projets
        └── theme.service.ts           ← Mode sombre / clair
```

---

## 5. Fonctionnalités implémentées

### 5.1 Vitrine publique

**Page Landing** (`/`) — Point d'entrée de l'application. Présente deux accès : visiteur et administrateur.

**Page Accueil** (`/accueil`) — Présentation générale du développeur avec un aperçu des trois premières compétences, des trois projets les plus récents et de l'historique des expériences professionnelles sous forme de timeline.

**Page Projets** (`/projets`) — Liste paginée de tous les projets publiés. Un menu déroulant permet de filtrer les projets par technologie (Angular, React, Java, etc.). Chaque carte affiche le titre, les tags technologiques et un extrait de description tronqué grâce au pipe personnalisé `truncate`.

**Page Détail Projet** (`/projet/:id`) — Page dédiée à un projet, accessible via son identifiant dans l'URL. Affiche la description complète, les technologies utilisées sous forme de badges, la date de création et un bouton vers le dépôt GitHub. Si l'identifiant ne correspond à aucun projet, un message d'erreur est affiché.

**Page Compétences** (`/competences`) — Grille de toutes les compétences avec leur niveau (Débutant, Intermédiaire, Avancé), leur icône FontAwesome et une barre de progression. Un système de filtrage par catégorie (Langages, Frameworks, Bases de données, Outils) est disponible.

**Page Contact** (`/contact`) — Formulaire de contact avec quatre champs validés (nom, e-mail, sujet, message). À la soumission, le message est enregistré dans la boîte de réception admin. Une confirmation visuelle est affichée à l'utilisateur après envoi.

### 5.2 Back-office administrateur

L'accès à l'espace administrateur est conditionné par une authentification. Les identifiants par défaut sont `admin` / `admin`.

**Tableau de bord** (`/admin/dashboard`) — Vue synthétique affichant en temps réel le nombre total de projets, de projets publiés, de compétences et d'expériences. Des raccourcis vers les sections de gestion sont disponibles.

**Gestion des projets** (`/admin/projets`) — Interface complète de gestion (CRUD) :
- Tableau de bord avec compteurs et indicateurs
- Recherche textuelle (titre, description, technologies)
- Tri par date (plus récent, plus ancien) ou par titre
- Ajout d'un nouveau projet via modal avec validation
- Modification d'un projet existant (pré-remplissage du formulaire)
- Bascule rapide du statut Publié ↔ Brouillon
- Suppression avec confirmation obligatoire

**Gestion des compétences** (`/admin/competences`) — CRUD similaire avec sélection du niveau et de l'icône FontAwesome.

**Gestion des expériences** (`/admin/experiences`) — CRUD des expériences professionnelles avec dates de début/fin.

**Boîte de réception** (`/admin/messages`) — Affiche les messages reçus via le formulaire de contact. Interface à deux panneaux : liste des messages à gauche, détail du message sélectionné à droite. Suppression avec confirmation.

---

## 6. Concepts Angular mis en œuvre

### 6.1 Composants et architecture standalone

Tous les composants sont déclarés en mode standalone (`standalone: true`). Chaque composant importe lui-même ses dépendances directes (modules, autres composants, pipes, directives) sans passer par un NgModule centralisé.

```typescript
@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe, HighlightDirective],
  templateUrl: './projets.component.html'
})
```

### 6.2 Injection de dépendances avec `inject()`

L'injection de dépendances est réalisée via la fonction `inject()` plutôt que par injection constructeur classique, conformément aux pratiques modernes d'Angular :

```typescript
private projetService = inject(ProjetService);
private fb = inject(FormBuilder);
```

### 6.3 Signaux (Signals)

L'état réactif de l'application repose sur trois types de signaux :

- `signal<T>(valeurInitiale)` — signal modifiable
- `computed(() => ...)` — valeur dérivée d'autres signaux, recalculée automatiquement
- `effect(() => ...)` — effet de bord déclenché lors des changements (utilisé dans `ThemeService`)

**Exemple dans le service de projets :**
```typescript
private projects = signal<Projet[]>(this.loadProjects());
public allProjects = computed(() => this.projects());
public publishedProjects = computed(() => 
  this.projects().filter(p => p.statut === 'Publié')
);
```

### 6.4 Data Binding

Les quatre formes de liaison de données sont utilisées dans les templates :

| Type | Syntaxe | Utilisation |
|---|---|---|
| Interpolation | `{{ signal() }}` | Affichage de valeurs |
| Property binding | `[class.active]="..."` | CSS conditionnel |
| Event binding | `(click)="..."` | Interactions utilisateur |
| Two-way binding | `[formGroup]` + `formControlName` | Formulaires réactifs |

### 6.5 Directives structurelles (nouvelle syntaxe)

L'application utilise exclusivement la nouvelle syntaxe de contrôle de flux introduite en Angular 17 :

```html
@if (project()) {
  ...
} @else {
  <p>Projet non trouvé.</p>
}

@for (proj of filteredProjects(); track proj.id) {
  <div class="project-card">...</div>
} @empty {
  <p>Aucun projet trouvé.</p>
}
```

La clause `track` permet à Angular d'identifier les éléments de liste de façon unique, optimisant les re-rendus. La clause `@empty` gère élégamment les listes vides.

### 6.6 Directive personnalisée (`HighlightDirective`)

Une directive d'attribut personnalisée a été créée pour ajouter un effet visuel au survol des cartes de projets, illustrant les concepts `@Directive`, `@HostListener` et `@HostBinding` :

```typescript
@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @HostBinding('style.transform') transform = '';
  @HostBinding('style.box-shadow') boxShadow = '';
  @HostBinding('style.transition') transition = 'transform 0.2s ease, box-shadow 0.2s ease';

  @HostListener('mouseenter') onMouseEnter(): void {
    this.transform = 'translateY(-6px)';
    this.boxShadow = '0 12px 28px rgba(99, 102, 241, 0.2)';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.transform = '';
    this.boxShadow = '';
  }
}
```

**Utilisation :**
```html
<div class="card project-card" appHighlight>...</div>
```

### 6.7 Pipe personnalisé (`TruncatePipe`)

Un pipe personnalisé `truncate` a été développé pour tronquer les descriptions longues avec une ellipse, en remplacement du pipe intégré `slice` qui nécessitait un `...` manuel dans le template :

```typescript
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
```

**Utilisation :**
```html
<p>{{ project.description | truncate:120 }}</p>
```

### 6.8 Formulaires réactifs (Reactive Forms)

L'ensemble des formulaires de l'application utilise l'approche **Reactive Forms** avec `FormBuilder`, `FormGroup` et `Validators`. Cette approche offre une meilleure testabilité et un contrôle programmatique complet de la validation.

**Exemple — Formulaire de contact :**
```typescript
contactForm: FormGroup = this.fb.group({
  nom:     ['', [Validators.required, Validators.minLength(2)]],
  email:   ['', [Validators.required, Validators.email]],
  sujet:   ['Collaboration sur un projet Angular', [Validators.required, Validators.minLength(4)]],
  message: ['', [Validators.required, Validators.minLength(10)]]
});
```

Les formulaires d'édition admin utilisent `patchValue()` pour pré-remplir les champs lors de l'ouverture en mode modification, et `markAllAsTouched()` pour déclencher l'affichage de toutes les erreurs à la soumission.

### 6.9 Services et Dependency Injection

Cinq services singleton sont déclarés avec `providedIn: 'root'` :

- `AuthService` — gestion de l'état d'authentification
- `ProjetService` — CRUD projets avec état signal
- `CompetenceService` — CRUD compétences
- `ExperienceService` — CRUD expériences
- `MessageService` — gestion des messages de contact
- `ThemeService` — gestion du mode sombre/clair

### 6.10 Routing

Le routing est configuré dans `app.routes.ts` avec les fonctionnalités suivantes :

- **Lazy loading** de tous les composants via `loadComponent()` — seul le code nécessaire est téléchargé à la navigation
- **Routes imbriquées** (nested routes) : `/admin` englobe les sous-routes `dashboard`, `projets`, etc.
- **Route wildcard** `**` pour la page 404
- **Redirection** : `/admin` redirige vers `/admin/dashboard`
- **Guard d'authentification** : `canActivate: [authGuard]` protège toutes les routes `/admin`
- **`withComponentInputBinding()`** : lie automatiquement les paramètres de route (`:id`) aux inputs de composants

```typescript
{
  path: 'admin',
  loadComponent: () => import('./components/admin/admin-layout/...'),
  canActivate: [authGuard],
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadComponent: () => import('...') },
    ...
  ]
}
```

### 6.11 Route Guard fonctionnel

La protection des routes admin est assurée par un guard fonctionnel (`CanActivateFn`), approche moderne qui remplace les classes guard des versions précédentes :

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) return true;
  return router.parseUrl('/admin/login');
};
```

---

## 7. Gestion des données

### 7.1 Modèles TypeScript

Les structures de données sont définies sous forme d'interfaces TypeScript dans `models/types.ts`, avec l'utilisation de types union pour les champs à valeurs contraintes :

```typescript
export interface Projet {
  id: number;
  titre: string;
  description: string;
  technologies: string[];
  statut: 'Publié' | 'Brouillon';
  github?: string;
  date?: string;
}
```

### 7.2 Persistance avec localStorage

En l'absence d'un serveur back-end, la persistance est assurée par le `localStorage` du navigateur. Chaque service charge ses données au démarrage et les sauvegarde après chaque opération CRUD.

Un mécanisme de protection est mis en place pour éviter les crashs en cas de données corrompues :

```typescript
private loadProjects(): Projet[] {
  const data = localStorage.getItem(this.STORAGE_KEY);
  if (data) {
    try { return JSON.parse(data); } catch { /* données corrompues */ }
  }
  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialProjects));
  return initialProjects;
}
```

### 7.3 Données initiales

Le fichier `data/mock-db.ts` contient les données de démonstration initiales (9 projets, 17 compétences, 5 expériences, 3 messages). Ces données sont injectées dans le `localStorage` à la première utilisation de chaque service si aucune donnée n'est encore présente.

---

## 8. Sécurité et navigation

### 8.1 Authentification simulée

L'authentification est simulée côté client dans `AuthService`. L'état de connexion est stocké dans le `localStorage` et exposé via un signal `isLoggedIn`. À la déconnexion, la clé est supprimée et le signal est mis à `false`.

### 8.2 Protection des routes

Le guard `authGuard` intercepte toute navigation vers `/admin/*`. Si l'utilisateur n'est pas authentifié, il est redirigé vers `/admin/login` via `router.parseUrl()`. Cette approche est préférable au simple retour de `false` car elle permet au routeur de composer correctement l'URL.

### 8.3 Thème sombre / clair

Le `ThemeService` utilise un signal `isDarkMode` combiné à un `effect()` pour synchroniser le DOM (classe CSS sur `document.documentElement`) et le `localStorage` à chaque changement de thème. La préférence système est détectée via `window.matchMedia('(prefers-color-scheme: dark)')` et appliquée en l'absence de préférence sauvegardée.

---

## 9. Difficultés rencontrées et solutions adoptées

### 9.1 Signaux et liaison bidirectionnelle

L'utilisation de `[(ngModel)]` avec un signal WritableSignal s'avère problématique : la directive ngModel remplace la référence du signal par une valeur primitive lors de l'événement `change`, rendant le signal inaccessible.

**Solution adoptée :** remplacement de `[(ngModel)]` par une combinaison de property binding et d'event binding explicites pour les champs non-formulaires :
```html
<select [value]="selectedTech()" (change)="selectedTech.set($any($event.target).value)">
```

### 9.2 Formulaires réactifs avec modales

La gestion de formulaires réactifs dans des modales qui s'ouvrent et se ferment dynamiquement nécessite une attention particulière : le formulaire doit être réinitialisé (`reset()`) à l'ouverture en mode ajout, et pré-rempli (`patchValue()`) en mode modification, sans recréer l'instance du `FormGroup`.

**Solution adoptée :** conservation d'un seul `FormGroup` par composant, réinitialisé ou patché selon le mode d'ouverture, avec un champ `editingId` séparé pour tracer l'élément en cours de modification.

### 9.3 Lazy loading et accès aux paramètres de route

Avec le lazy loading, chaque composant est instancié dynamiquement. Pour accéder au paramètre `:id` de la route sans importer `ActivatedRoute`, l'option `withComponentInputBinding()` a été utilisée dans la configuration du routeur :

```typescript
provideRouter(routes, withComponentInputBinding())
```

Ceci permet de lier le paramètre directement à un signal `input()` dans le composant :
```typescript
id = input<string>();
project = computed(() => this.projetService.getProjectById(+(this.id() ?? 0)));
```

---

## 10. Conclusion

Le projet DevFolio constitue une application Angular complète et fonctionnelle, respectant l'intégralité du cahier des charges initial. Il démontre la maîtrise des concepts fondamentaux du framework — composants, services, routing, formulaires, pipes et directives — ainsi que l'utilisation des fonctionnalités les plus récentes d'Angular (signaux, détection de changements sans Zone.js, nouvelle syntaxe de contrôle de flux).

Au-delà des exigences du brief, le projet intègre des fonctionnalités supplémentaires telles que la gestion des expériences professionnelles, la boîte de réception admin, le mode sombre/clair persistant et le lazy loading systématique de tous les composants.

Ce projet a permis de mettre en pratique de manière concrète les enseignements des quatre séances du module Angular et d'explorer par nous-mêmes des concepts plus avancés qui seront couverts dans les séances suivantes (Reactive Forms, persistance de données).

---

*Rapport rédigé dans le cadre du module Angular — ILISI1 — Année académique 2025/2026*
