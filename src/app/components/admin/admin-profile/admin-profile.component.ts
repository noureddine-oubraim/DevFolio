import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService, SpokenLanguage, Interest } from '../../../services/profile.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  profileService = inject(ProfileService);
  private fb = inject(FormBuilder);

  // States
  cvDataUrl = this.profileService.cvDataUrl;
  spokenLanguages = this.profileService.spokenLanguages;
  interests = this.profileService.interests;
  softSkills = this.profileService.softSkills;

  // Language Form
  langForm: FormGroup = this.fb.group({
    flag: ['', Validators.required],
    name: ['', Validators.required],
    level: ['', Validators.required]
  });

  // Interest Form
  interestForm: FormGroup = this.fb.group({
    icon: ['fa-solid fa-star', Validators.required],
    label: ['', Validators.required]
  });

  // Soft Skill Form
  softSkillForm: FormGroup = this.fb.group({
    skill: ['', Validators.required]
  });

  // File handling
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileService.updateCvUrl(e.target.result);
        alert('CV mis à jour avec succès !');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Veuillez sélectionner un fichier PDF valide.');
    }
  }

  deleteCv() {
    if (confirm('Voulez-vous vraiment supprimer le CV ?')) {
      this.profileService.updateCvUrl(null);
    }
  }

  // Languages CRUD
  addLanguage() {
    if (this.langForm.valid) {
      const newLang: SpokenLanguage = {
        id: Date.now(),
        ...this.langForm.value
      };
      this.profileService.updateLanguages([...this.spokenLanguages(), newLang]);
      this.langForm.reset({ flag: '', name: '', level: '' });
    }
  }

  removeLanguage(id: number) {
    this.profileService.updateLanguages(this.spokenLanguages().filter(l => l.id !== id));
  }

  // Interests CRUD
  addInterest() {
    if (this.interestForm.valid) {
      const newInterest: Interest = {
        id: Date.now(),
        ...this.interestForm.value
      };
      this.profileService.updateInterests([...this.interests(), newInterest]);
      this.interestForm.reset({ icon: 'fa-solid fa-star', label: '' });
    }
  }

  removeInterest(id: number) {
    this.profileService.updateInterests(this.interests().filter(i => i.id !== id));
  }

  // Soft Skills CRUD
  addSoftSkill() {
    if (this.softSkillForm.valid) {
      const skill = this.softSkillForm.value.skill;
      this.profileService.updateSoftSkills([...this.softSkills(), skill]);
      this.softSkillForm.reset({ skill: '' });
    }
  }

  removeSoftSkill(skill: string) {
    this.profileService.updateSoftSkills(this.softSkills().filter(s => s !== skill));
  }
}
