import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private messageService = inject(MessageService);

  nom = signal('');
  email = signal('');
  sujet = signal('');
  message = signal('');
  soumis = signal(false);

  isSubmitted = signal(false);

  get nomValide(): boolean {
    return this.nom().trim().length >= 2;
  }

  get emailValide(): boolean {
    const email = this.email().trim();
    return email.includes('@') && email.includes('.');
  }

  get sujetValide(): boolean {
    return this.sujet().trim().length >= 4;
  }

  get messageValide(): boolean {
    return this.message().trim().length >= 10;
  }

  get formValide(): boolean {
    return this.nomValide && this.emailValide && this.sujetValide && this.messageValide;
  }

  onSubmit() {
    this.soumis.set(true);
    if (!this.formValide) return;

    this.messageService.addMessage({
      nom: this.nom().trim(),
      email: this.email().trim(),
      sujet: this.sujet().trim(),
      message: this.message().trim()
    });
    this.isSubmitted.set(true);
  }

  resetForm() {
    this.nom.set('');
    this.email.set('');
    this.sujet.set('');
    this.message.set('');
    this.soumis.set(false);
    this.isSubmitted.set(false);
  }
}
