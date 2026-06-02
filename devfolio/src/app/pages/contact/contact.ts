import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact implements OnInit {
  contactForm!: FormGroup;
  envoye = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sujet: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  champInvalide(nomChamp: string): boolean {
    const c = this.contactForm.get(nomChamp);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  envoyer(): void {
    if (this.contactForm.valid) {
      this.envoye = true;
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
