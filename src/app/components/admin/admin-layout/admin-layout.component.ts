import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-container">
      <aside class="admin-sidebar">
        <div class="sidebar-header">
          <a routerLink="/" class="logo">
            Noureddine<span class="logo-dot">.admin</span>
          </a>
        </div>
        
        <nav class="sidebar-nav">
          <ul>
            <li>
              <a routerLink="/admin/dashboard" routerLinkActive="active">
                <i class="fa-solid fa-gauge"></i> Tableau de Bord
              </a>
            </li>
            <li>
              <a routerLink="/admin/projets" routerLinkActive="active">
                <i class="fa-solid fa-diagram-project"></i> Mes Projets
              </a>
            </li>
            <li>
              <a routerLink="/admin/competences" routerLinkActive="active">
                <i class="fa-solid fa-code-fork"></i> Mes Compétences
              </a>
            </li>
            <li>
              <a routerLink="/admin/experiences" routerLinkActive="active">
                <i class="fa-solid fa-briefcase"></i> Mes Expériences
              </a>
            </li>
            <li>
              <a routerLink="/admin/messages" routerLinkActive="active">
                <i class="fa-solid fa-inbox"></i> Boîte de Réception
              </a>
            </li>
          </ul>
        </nav>
        
        <div class="sidebar-footer">
          <button class="logout-btn" (click)="logout()">
            <i class="fa-solid fa-power-off"></i> Fermer Session
          </button>
        </div>
      </aside>
      
      <main class="admin-main">
        <header class="admin-header">
          <div class="header-left">
            <!-- Breadcrumbs or page title could go here -->
          </div>
          <div class="header-right">
            <a routerLink="/" class="btn btn-outline" style="margin-right: 1rem;" target="_blank">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> View Site
            </a>
            <button class="theme-toggle" (click)="themeService.toggleTheme()" aria-label="Toggle theme">
              @if (themeService.isDarkMode()) {
                <i class="fa-solid fa-sun"></i>
              } @else {
                <i class="fa-solid fa-moon"></i>
              }
            </button>
          </div>
        </header>
        
        <div class="admin-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      min-height: 100vh;
      background-color: var(--bg-primary);
    }
    .admin-sidebar {
      width: 260px;
      background-color: var(--bg-secondary);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 40;
    }
    .sidebar-header {
      height: 4rem;
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }
    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .logo-dot {
      color: var(--accent-primary);
    }
    .sidebar-nav {
      padding: 1.5rem 0;
      flex-grow: 1;
    }
    .sidebar-nav ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .sidebar-nav a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.5rem;
      color: var(--text-secondary);
      transition: all 0.2s;
      border-left: 3px solid transparent;
    }
    .sidebar-nav a:hover {
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
    }
    .sidebar-nav a.active {
      background-color: var(--bg-tertiary);
      color: var(--accent-primary);
      border-left-color: var(--accent-primary);
      font-weight: 500;
    }
    .sidebar-footer {
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);
    }
    .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #ef4444;
      font-weight: 500;
      width: 100%;
      padding: 0.5rem 0;
      transition: color 0.2s;
    }
    .logout-btn:hover {
      color: #b91c1c;
    }
    
    .admin-main {
      flex-grow: 1;
      margin-left: 260px; /* match sidebar width */
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .admin-header {
      height: 4rem;
      background-color: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      position: sticky;
      top: 0;
      z-index: 30;
    }
    .header-right {
      display: flex;
      align-items: center;
    }
    .theme-toggle {
      color: var(--text-secondary);
      font-size: 1.25rem;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.2s;
    }
    .theme-toggle:hover {
      color: var(--text-primary);
      background-color: var(--bg-tertiary);
    }
    .admin-content {
      padding: 2rem;
      flex-grow: 1;
    }
  `]
})
export class AdminLayoutComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/accueil']);
  }
}
