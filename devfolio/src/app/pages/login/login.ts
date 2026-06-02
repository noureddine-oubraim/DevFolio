import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  erreur = false;
  voirMdp = false;
  chargement = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      identifiant: ['', Validators.required],
      motDePasse: ['', Validators.required],
    });
  }

  seConnecter(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.chargement = true;
    const { identifiant, motDePasse } = this.loginForm.value;
    setTimeout(() => {
      this.chargement = false;
      this.erreur = !(identifiant === 'admin' && motDePasse === 'admin123');
    }, 800);
  }
}
