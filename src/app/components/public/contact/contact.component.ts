import { Component, signal, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container page-container">
      <div class="contact-wrapper">
        <div class="contact-info">
          <h1>Parlons de votre projet.</h1>
          <p>Une idée, une collaboration, une question ? Envoyez-moi un message. Je vous répondrai dans les plus brefs délais.</p>
          
          <div class="contact-methods">
            <div class="method">
              <div class="method-icon"><i class="fa-regular fa-envelope"></i></div>
              <div class="method-details">
                <span class="method-label">E-MAIL</span>
                <span class="method-value">noureddineoubraim1&#64;gmail.com</span>
              </div>
            </div>
            <div class="method">
              <div class="method-icon"><i class="fa-solid fa-phone"></i></div>
              <div class="method-details">
                <span class="method-label">TÉLÉPHONE</span>
                <span class="method-value">06 84 06 86 95</span>
              </div>
            </div>
            <div class="method">
              <div class="method-icon"><i class="fa-solid fa-location-dot"></i></div>
              <div class="method-details">
                <span class="method-label">ADRESSE</span>
                <span class="method-value">Casablanca, Maroc</span>
              </div>
            </div>
            <div class="method">
              <div class="method-icon"><i class="fa-brands fa-linkedin-in"></i></div>
              <div class="method-details">
                <span class="method-label">LINKEDIN</span>
                <span class="method-value"><a href="https://www.linkedin.com/in/noureddine-oubraim-0004a7311/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">Noureddine Oubraim</a></span>
              </div>
            </div>
            <div class="method">
              <div class="method-icon"><i class="fa-brands fa-github"></i></div>
              <div class="method-details">
                <span class="method-label">GITHUB</span>
                <span class="method-value"><a href="https://github.com/noureddineoubraim1-cmyk" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">noureddineoubraim1-cmyk</a></span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-form-container card">
          @if (isSubmitted()) {
            <div class="success-message">
              <div class="success-icon"><i class="fa-regular fa-circle-check"></i></div>
              <h3>Merci, message envoyé !</h3>
              <p>Votre message a été transmis avec succès. Je vous contacterai très bientôt.</p>
              <button class="btn btn-outline" (click)="resetForm()">Envoyer un autre message</button>
            </div>
          } @else {
            <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)" class="contact-form" novalidate>
              <div class="form-row">
                <div class="input-group">
                  <label for="name">Nom *</label>
                  <input type="text" id="name" name="name" class="input-control" 
                         [class.invalid]="name.invalid && (name.dirty || name.touched)"
                         [(ngModel)]="formData.nom" #name="ngModel" required minlength="2">
                  @if (name.invalid && (name.dirty || name.touched)) {
                    <div class="error-text">
                      @if (name.errors?.['required']) { <span>Le nom est obligatoire.</span> }
                      @if (name.errors?.['minlength']) { <span>Le nom doit contenir au moins 2 caractères.</span> }
                    </div>
                  }
                </div>
                
                <div class="input-group">
                  <label for="email">E-mail *</label>
                  <input type="email" id="email" name="email" class="input-control"
                         [class.invalid]="email.invalid && (email.dirty || email.touched)"
                         [(ngModel)]="formData.email" #email="ngModel" required email>
                  @if (email.invalid && (email.dirty || email.touched)) {
                    <div class="error-text">
                      @if (email.errors?.['required']) { <span>L'adresse e-mail est obligatoire.</span> }
                      @if (email.errors?.['email']) { <span>Veuillez entrer une adresse e-mail valide.</span> }
                    </div>
                  }
                </div>
              </div>
              
              <div class="input-group">
                <label for="sujet">Sujet *</label>
                <input type="text" id="sujet" name="sujet" class="input-control"
                       [class.invalid]="sujet.invalid && (sujet.dirty || sujet.touched)"
                       [(ngModel)]="formData.sujet" #sujet="ngModel" required minlength="4">
                @if (sujet.invalid && (sujet.dirty || sujet.touched)) {
                  <div class="error-text">
                    @if (sujet.errors?.['required']) { <span>Le sujet est obligatoire.</span> }
                    @if (sujet.errors?.['minlength']) { <span>Le sujet doit faire au moins 4 caractères.</span> }
                  </div>
                }
              </div>

              <div class="input-group">
                <label for="message">Message *</label>
                <textarea id="message" name="message" class="input-control" rows="5"
                          [class.invalid]="message.invalid && (message.dirty || message.touched)"
                          [(ngModel)]="formData.message" #message="ngModel" required minlength="10"></textarea>
                @if (message.invalid && (message.dirty || message.touched)) {
                  <div class="error-text">
                    @if (message.errors?.['required']) { <span>Le message est obligatoire.</span> }
                    @if (message.errors?.['minlength']) { <span>Le message doit faire au moins 10 caractères.</span> }
                  </div>
                }
              </div>
              
              <button type="submit" class="btn btn-primary submit-btn" [disabled]="contactForm.invalid">
                Envoyer <i class="fa-regular fa-paper-plane" style="margin-left: 0.5rem;"></i>
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 5rem 1.5rem;
    }
    .contact-wrapper {
      display: grid;
      grid-template-columns: 1fr;
      gap: 4rem;
    }
    @media (min-width: 992px) {
      .contact-wrapper {
        grid-template-columns: 1fr 1fr;
        align-items: start;
      }
    }
    .contact-info h1 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    .contact-info p {
      font-size: 1.125rem;
      margin-bottom: 3rem;
    }
    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .method {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .method-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: var(--bg-tertiary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      color: var(--accent-primary);
    }
    .method-details {
      display: flex;
      flex-direction: column;
    }
    .method-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-tertiary);
      letter-spacing: 0.05em;
    }
    .method-value {
      font-weight: 500;
      color: var(--text-primary);
    }
    
    .contact-form-container {
      padding: 2.5rem;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    @media (min-width: 640px) {
      .form-row {
        grid-template-columns: 1fr 1fr;
      }
    }
    .input-control.invalid {
      border-color: #ef4444;
    }
    .input-control.invalid:focus {
      box-shadow: 0 0 0 1px #ef4444;
    }
    .submit-btn {
      width: 100%;
      padding: 0.875rem;
      font-size: 1rem;
      margin-top: 1rem;
    }
    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .success-message {
      text-align: center;
      padding: 2rem 0;
    }
    .success-icon {
      font-size: 4rem;
      color: #10b981;
      margin-bottom: 1.5rem;
    }
    .success-message h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .success-message p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }
  `]
})
export class ContactComponent {
  private messageService = inject(MessageService);

  formData = {
    nom: '',
    email: '',
    sujet: 'Collaboration sur un projet Angular',
    message: ''
  };

  isSubmitted = signal(false);

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.messageService.addMessage({
        nom: this.formData.nom,
        email: this.formData.email,
        sujet: this.formData.sujet,
        message: this.formData.message
      });
      this.isSubmitted.set(true);
    }
  }

  resetForm() {
    this.formData = {
      nom: '',
      email: '',
      sujet: 'Collaboration sur un projet Angular',
      message: ''
    };
    this.isSubmitted.set(false);
  }
}

