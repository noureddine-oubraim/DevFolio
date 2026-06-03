import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Projet } from '../../../models/project.model';
import { ProjetService } from '../../../services/projet';

@Component({
  selector: 'app-admin-projets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-projets.html',
  styleUrls: ['./admin-projets.css'],
})
export class AdminProjets {
  projets: Projet[] = [];
  formulaireVisible = false;
  projetEnEdition: Projet | null = null;
  projetForm: FormGroup;

  constructor(private projetService: ProjetService, private fb: FormBuilder) {
    this.projets = this.projetService.getProjets();
    this.projetForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      technologies: ['', Validators.required],
      githubUrl: [''],
      statut: ['publie', Validators.required]
    });
  }

  ouvrirFormulaire(): void {
    this.formulaireVisible = true;
    this.projetEnEdition = null;
    this.projetForm.reset({ statut: 'publie' });
  }

  fermerFormulaire(): void {
    this.formulaireVisible = false;
    this.projetEnEdition = null;
    this.projetForm.reset({ statut: 'publie' });
  }

  editer(projet: Projet): void {
    this.projetEnEdition = projet;
    this.projetForm.setValue({
      titre: projet.titre,
      description: projet.description,
      technologies: projet.technologies.join(', '),
      githubUrl: projet.githubUrl,
      statut: projet.statut
    });
    this.formulaireVisible = true;
  }

  supprimer(id: number): void {
    this.projetService.supprimerProjet(id);
    this.projets = this.projetService.getProjets();
  }

  sauvegarder(): void {
    if (this.projetForm.invalid) {
      this.projetForm.markAllAsTouched();
      return;
    }

    const formValue = this.projetForm.value;
    const projet: Projet = {
      id: this.projetEnEdition ? this.projetEnEdition.id : this.getProchainId(),
      titre: formValue.titre,
      description: formValue.description,
      technologies: formValue.technologies
        .split(',')
        .map((tech: string) => tech.trim())
        .filter((tech: string) => tech.length > 0),
      githubUrl: formValue.githubUrl || '',
      statut: formValue.statut,
      dateCreation: this.projetEnEdition ? this.projetEnEdition.dateCreation : new Date()
    };

    if (this.projetEnEdition) {
      this.projetService.modifierProjet(projet);
    } else {
      this.projetService.ajouterProjet(projet);
    }

    this.projets = this.projetService.getProjets();
    this.fermerFormulaire();
  }

  champInvalide(champ: string): boolean {
    const controle = this.projetForm.get(champ);
    return !!controle && controle.invalid && (controle.dirty || controle.touched);
  }

  private getProchainId(): number {
    return this.projets.length ? Math.max(...this.projets.map((p) => p.id)) + 1 : 1;
  }
}
