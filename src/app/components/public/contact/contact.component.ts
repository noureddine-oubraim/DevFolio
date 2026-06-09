import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  contactForm: FormGroup = this.fb.group({
    nom:     ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    sujet:   ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isSubmitted = signal(false);

  onSubmit() {
    if (this.contactForm.valid) {
      const { nom, email, sujet, message } = this.contactForm.value;
      this.messageService.addMessage({ nom, email, sujet, message });
      this.isSubmitted.set(true);
    }
  }

  resetForm() {
    this.contactForm.reset({ sujet: '' });
    this.isSubmitted.set(false);
  }
}
