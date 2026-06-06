import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="landing-page">
      <div class="landing-content container">
        <div class="brand">
          <h1>DevFolio<span class="accent">.</span></h1>
          <p class="tagline">Bienvenue sur la plateforme de présentation de Noureddine Oubraim.</p>
        </div>
        
        <div class="project-info">
          <p>
            Ce projet est un portfolio interactif complet développé avec <strong>Angular</strong>.
            Il démontre mes compétences en développement Full-Stack, incluant un back-office
            complet pour la gestion de contenu et une vitrine publique élégante.
          </p>
        </div>

        <div class="choices-grid">
          <!-- Visitor Access -->
          <a routerLink="/accueil" class="choice-card visitor-card card">
            <div class="choice-icon">
              <i class="fa-solid fa-users"></i>
            </div>
            <h2>Accès Visiteur</h2>
            <p>Découvrez mon portfolio, mes projets, mes compétences et mon parcours professionnel.</p>
            <span class="btn btn-primary">Entrer <i class="fa-solid fa-arrow-right"></i></span>
          </a>

          <!-- Admin Access -->
          <a routerLink="/admin/login" class="choice-card admin-card card">
            <div class="choice-icon">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h2>Accès Administrateur</h2>
            <p>Gérez le contenu du portfolio : ajoutez des projets, mettez à jour les expériences et lisez les messages.</p>
            <span class="btn btn-outline">Se connecter <i class="fa-solid fa-arrow-right"></i></span>
          </a>
        </div>
      </div>
      
      <!-- Subtle background decoration -->
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
    </div>
  `,
  styles: [`
    .landing-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--bg-primary);
      position: relative;
      overflow: hidden;
      padding: 2rem;
    }
    .landing-content {
      position: relative;
      z-index: 10;
      max-width: 900px;
      text-align: center;
    }
    .brand h1 {
      font-size: clamp(3rem, 8vw, 4.5rem);
      font-weight: 800;
      letter-spacing: -0.05em;
      margin-bottom: 0.5rem;
      line-height: 1;
    }
    .accent {
      color: var(--accent-primary);
    }
    .tagline {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: 2.5rem;
    }
    .project-info {
      max-width: 700px;
      margin: 0 auto 4rem;
      font-size: 1.1rem;
      color: var(--text-tertiary);
      line-height: 1.6;
    }
    .project-info strong {
      color: var(--text-primary);
    }
    
    .choices-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    @media (min-width: 768px) {
      .choices-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .choice-card {
      padding: 3rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      text-decoration: none;
      color: inherit;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
      background-color: var(--bg-secondary);
    }
    .choice-card:hover {
      transform: translateY(-8px);
    }
    .visitor-card:hover {
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.3);
    }
    .admin-card:hover {
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .choice-icon {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      background-color: var(--bg-tertiary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
      transition: background-color 0.3s, color 0.3s;
    }
    .visitor-card .choice-icon {
      color: var(--accent-primary);
      background-color: rgba(99, 102, 241, 0.1);
    }
    
    .choice-card h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .choice-card p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
      flex-grow: 1;
      font-size: 0.95rem;
    }
    .btn {
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    /* Decorative Background */
    .bg-shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      z-index: 1;
      opacity: 0.15;
    }
    .shape-1 {
      width: 600px;
      height: 600px;
      background: var(--accent-primary);
      top: -200px;
      left: -200px;
    }
    .shape-2 {
      width: 500px;
      height: 500px;
      background: #10b981;
      bottom: -150px;
      right: -150px;
    }
  `]
})
export class LandingComponent {}
