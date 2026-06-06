import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Projets } from './pages/projets/projets';
import { DetailProjet } from './pages/detail-projet/detail-projet';
import { Competences } from './pages/competences/competences';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: Accueil },
  { path: 'projets', component: Projets },
  { path: 'competences', component: Competences },
  { path: 'contact', component: Contact },
  { path: 'login', component: Login },
  { path: '**', redirectTo: 'accueil' },
];
