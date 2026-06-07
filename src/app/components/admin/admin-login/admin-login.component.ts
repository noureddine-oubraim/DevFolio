import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage = signal('');

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.authService.login(username, password);
      if (success) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage.set('Identifiants incorrects (par défaut : admin / admin)');
      }
    }
  }
}
