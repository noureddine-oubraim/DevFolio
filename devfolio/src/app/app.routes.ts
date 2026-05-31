import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Accueil } from './pages/accueil/accueil';
import { Projets } from './pages/projets/projets';
import { DetailProjet } from './pages/detail-projet/detail-projet';
import { Competences } from './pages/competences/competences';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { AdminProjets } from './pages/admin/admin-projets/admin-projets';
import { AdminCompetences } from './pages/admin/admin-competences/admin-competences';

export const routes: Routes = [
  { path: '',              redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil',       component: Accueil },
  { path: 'projets',       component: Projets },
  { path: 'projets/:id',   component: DetailProjet },
  { path: 'competences',   component: Competences },
  { path: 'contact',       component: Contact },
  { path: 'login',         component: Login },
  { path: 'admin/projets',      component: AdminProjets,     canActivate: [authGuard] },
  { path: 'admin/competences',  component: AdminCompetences, canActivate: [authGuard] },
  { path: '**',            redirectTo: 'accueil' }
];