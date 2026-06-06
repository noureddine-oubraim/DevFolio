import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <p class="copyright" (dblclick)="goToAdmin()" style="cursor: default;" title="© 2026 DevFolio">© 2026 DevFolio. Built for Developers.</p>
        <div class="footer-links">
          <a href="https://github.com/noureddineoubraim1-cmyk" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
          <a href="https://www.linkedin.com/in/noureddine-oubraim-0004a7311/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--bg-tertiary);
      border-top: 1px solid var(--border-color);
      padding: 2rem 0;
      margin-top: auto; /* Push to bottom if content is short */
    }
    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    @media (min-width: 768px) {
      .footer-content {
        flex-direction: row;
        justify-content: space-between;
      }
    }
    .copyright {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .footer-links {
      display: flex;
      gap: 1.5rem;
    }
    .footer-links a {
      color: var(--text-secondary);
      font-size: 1.25rem;
      transition: color 0.2s;
    }
    .footer-links a:hover {
      color: var(--text-primary);
    }
  `]
})
export class FooterComponent {
  private router = inject(Router);

  goToAdmin() {
    this.router.navigate(['/admin/login']);
  }
}
