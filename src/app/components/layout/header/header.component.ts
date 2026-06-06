import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container header-content">
        <a routerLink="/" class="logo">
          Noureddine<span class="logo-dot">.dev</span>
        </a>
        
        <nav class="desktop-nav">
          <ul>
            <li><a routerLink="/accueil" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Accueil</a></li>
            <li><a routerLink="/projets" routerLinkActive="active">Projets</a></li>
            <li><a routerLink="/competences" routerLinkActive="active">Compétences</a></li>
            <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <button class="theme-toggle" (click)="themeService.toggleTheme()" aria-label="Toggle theme">
            @if (themeService.isDarkMode()) {
              <i class="fa-solid fa-sun icon-spin"></i>
            } @else {
              <i class="fa-solid fa-moon icon-bounce"></i>
            }
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--bg-primary);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 50;
      transition: background-color 0.3s ease;
    }
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4rem;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.025em;
    }
    .logo-dot {
      color: var(--accent-primary);
    }
    .desktop-nav ul {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .desktop-nav a {
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.95rem;
      transition: color 0.2s;
      padding: 0.5rem 0;
      position: relative;
    }
    .desktop-nav a:hover {
      color: var(--text-primary);
    }
    .desktop-nav a.active {
      color: var(--accent-primary);
    }
    .desktop-nav a.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--accent-primary);
    }
    .console-link {
      font-family: monospace;
      background: var(--bg-tertiary);
      padding: 0.35rem 0.75rem !important;
      border-radius: 0.375rem;
      border: 1px solid var(--border-color);
    }
    .console-link.active {
      background: var(--accent-primary) !important;
      color: white !important;
    }
    .console-link.active::after {
      display: none !important;
    }
    .theme-toggle {
      color: var(--text-secondary);
      font-size: 1.25rem;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .theme-toggle:hover {
      color: var(--text-primary);
      background-color: var(--bg-tertiary);
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    .icon-spin {
      animation: spin 8s linear infinite;
    }
    .icon-bounce {
      animation: bounce 2s ease-in-out infinite;
    }
  `]
})
export class HeaderComponent {
  themeService = inject(ThemeService);
}

