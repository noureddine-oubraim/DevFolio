import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjetService } from '../../services/projet';
import { Projet } from '../../models/project.model';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css'],
})
export class Accueil implements OnInit {
  nom = 'Votre Nom';
  titre = 'Developpeur Web';
  initiales = 'VN';
  stats = [
    { valeur: 2, label: 'Projets' },
    { valeur: 1, label: 'Annees' },
  ];
  projetsRecents: Projet[] = [];

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.projetsRecents = this.projetService.getProjets().slice(0, 3);
  }
}
