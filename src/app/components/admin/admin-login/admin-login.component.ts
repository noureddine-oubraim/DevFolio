import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <div class="theme-toggle-container">
        <button class="theme-toggle" (click)="themeService.toggleTheme()" aria-label="Toggle theme">
          @if (themeService.isDarkMode()) {
            <i class="fa-solid fa-sun"></i>
          } @else {
            <i class="fa-solid fa-moon"></i>
          }
        </button>
      </div>

      <div class="login-card card">
        <div class="login-header">
          <h2>Admin Login</h2>
          <p>Sign in to manage your portfolio</p>
        </div>
        
        <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
          <div class="input-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" class="input-control" 
                   [(ngModel)]="credentials.username" required>
          </div>
          
          <div class="input-group" style="margin-bottom: 2rem;">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" class="input-control" 
                   [(ngModel)]="credentials.password" required>
          </div>
          
          @if (errorMessage()) {
            <div class="error-message">
              <i class="fa-solid fa-circle-exclamation"></i> {{ errorMessage() }}
            </div>
          }
          
          <button type="submit" class="btn btn-primary submit-btn" [disabled]="loginForm.invalid">
            Sign In
          </button>
        </form>
        
        <div class="login-footer">
          <a href="/" class="back-link"><i class="fa-solid fa-arrow-left"></i> Back to Public Site</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--bg-tertiary);
      padding: 1.5rem;
      position: relative;
    }
    .theme-toggle-container {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
    }
    .theme-toggle {
      color: var(--text-secondary);
      font-size: 1.25rem;
      padding: 0.5rem;
      border-radius: 50%;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      transition: all 0.2s;
    }
    .theme-toggle:hover {
      color: var(--text-primary);
      box-shadow: var(--shadow-md);
    }
    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 2.5rem 2rem;
    }
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .login-header h2 {
      margin-bottom: 0.5rem;
    }
    .submit-btn {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
    }
    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .error-message {
      background-color: #fee2e2;
      color: #b91c1c;
      padding: 0.75rem;
      border-radius: 0.375rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .login-footer {
      margin-top: 2rem;
      text-align: center;
      border-top: 1px solid var(--border-color);
      padding-top: 1.5rem;
    }
    .back-link {
      color: var(--text-secondary);
      font-size: 0.875rem;
      transition: color 0.2s;
    }
    .back-link:hover {
      color: var(--text-primary);
    }
    /* Dark mode override for error message */
    :global(.dark) .error-message {
      background-color: rgba(239, 68, 68, 0.1);
      color: #fca5a5;
    }
  `]
})
export class AdminLoginComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  router = inject(Router);

  credentials = {
    username: '',
    password: ''
  };

  errorMessage = signal('');

  onSubmit(form: NgForm) {
    if (form.valid) {
      const success = this.authService.login(this.credentials.username, this.credentials.password);
      if (success) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage.set('Invalid username or password (default: admin/admin)');
      }
    }
  }
}
