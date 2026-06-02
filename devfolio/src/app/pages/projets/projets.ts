import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjetService } from '../../services/projet';
import { Projet } from '../../models/project.model';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './projets.html',
  styleUrls: ['./projets.css'],
})
export class Projets implements OnInit {
  projets: Projet[] = [];
  projetsFiltres: Projet[] = [];
  technologies = ['Tous', 'Angular', 'Node.js', 'RxJS'];
  filtreActif = 'tous';

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.projets = this.projetService.getProjets();
    this.projetsFiltres = [...this.projets];
  }

  filtrer(f: string): void {
    this.filtreActif = f;
    if (f === 'tous') this.projetsFiltres = [...this.projets];
    else this.projetsFiltres = this.projets.filter(p => p.technologies.includes(f));
  }
}
