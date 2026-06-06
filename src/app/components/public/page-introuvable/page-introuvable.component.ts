import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-introuvable',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container">
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <a routerLink="/" class="btn btn-primary">Return to Home</a>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 200px); /* Adjust based on header/footer */
      text-align: center;
      padding: 2rem;
    }
    .error-code {
      font-size: 8rem;
      font-weight: 700;
      color: var(--accent-primary);
      line-height: 1;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.125rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }
  `]
})
export class PageIntrouvableComponent {}
