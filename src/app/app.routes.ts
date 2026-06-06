import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/public/landing/landing.component').then(m => m.LandingComponent), pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./components/layout/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [
      {
        path: 'accueil',
        loadComponent: () => import('./components/public/accueil/accueil.component').then(m => m.AccueilComponent)
      },
      {
        path: 'projets',
        loadComponent: () => import('./components/public/projets/projets.component').then(m => m.ProjetsComponent)
      },
      {
        path: 'projet/:id',
        loadComponent: () => import('./components/public/project-detail/project-detail.component').then(m => m.ProjectDetailComponent)
      },
      {
        path: 'competences',
        loadComponent: () => import('./components/public/competences/competences.component').then(m => m.CompetencesComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./components/public/contact/contact.component').then(m => m.ContactComponent)
      }
    ]
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./components/admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'projets', loadComponent: () => import('./components/admin/admin-projects/admin-projects.component').then(m => m.AdminProjectsComponent) },
      { path: 'competences', loadComponent: () => import('./components/admin/admin-skills/admin-skills.component').then(m => m.AdminSkillsComponent) },
      { path: 'messages', loadComponent: () => import('./components/admin/admin-messages/admin-messages.component').then(m => m.AdminMessagesComponent) },
      { path: 'experiences', loadComponent: () => import('./components/admin/admin-experiences/admin-experiences.component').then(m => m.AdminExperiencesComponent) }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./components/public/page-introuvable/page-introuvable.component').then(m => m.PageIntrouvableComponent)
  }
];
