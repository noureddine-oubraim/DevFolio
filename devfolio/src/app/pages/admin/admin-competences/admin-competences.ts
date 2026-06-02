import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Competence } from '../../../models/project.model';

@Component({
  selector: 'app-admin-competences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-competences.html',
  styleUrls: ['./admin-competences.css'],
})
export class AdminCompetences implements OnInit {
  competences: Competence[] = [];
  compForm!: FormGroup;
  formulaireVisible = false;
  compEnEdition: Competence | null = null;
  idASupprimer: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.competences = [
      { id: 1, nom: 'Angular', categorie: 'frontend', niveau: 80, pourcentage: 80 },
      { id: 2, nom: 'Node.js', categorie: 'backend', niveau: 70, pourcentage: 70 },
    ];

    this.compForm = this.fb.group({
      nom: ['', Validators.required],
      categorie: ['frontend', Validators.required],
      pourcentage: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  ouvrirFormulaire(): void {
    this.formulaireVisible = true;
    this.compEnEdition = null;
    this.compForm.reset({ categorie: 'frontend', pourcentage: 50 });
  }

  fermerFormulaire(): void {
    this.formulaireVisible = false;
    this.compEnEdition = null;
  }

  champInvalide(nomChamp: string): boolean {
    const c = this.compForm.get(nomChamp);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  sauvegarder(): void {
    if (this.compForm.invalid) {
      this.compForm.markAllAsTouched();
      return;
    }

    const val = this.compForm.value;
    if (this.compEnEdition) {
      this.compEnEdition.nom = val.nom;
      this.compEnEdition.categorie = val.categorie;
      this.compEnEdition.niveau = val.pourcentage;
      this.compEnEdition.pourcentage = val.pourcentage;
    } else {
      const id = this.competences.length ? Math.max(...this.competences.map(c => c.id)) + 1 : 1;
      this.competences.push({ id, nom: val.nom, categorie: val.categorie, niveau: val.pourcentage, pourcentage: val.pourcentage });
    }

    this.fermerFormulaire();
  }

  editer(comp: Competence): void {
    this.compEnEdition = comp;
    this.formulaireVisible = true;
    this.compForm.setValue({ nom: comp.nom, categorie: comp.categorie, pourcentage: comp.niveau });
  }

  confirmerSuppression(id: number): void {
    this.idASupprimer = id;
  }

  supprimer(): void {
    if (this.idASupprimer === null) return;
    this.competences = this.competences.filter(c => c.id !== this.idASupprimer);
    this.idASupprimer = null;
  }
}
