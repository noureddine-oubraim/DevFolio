import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProjetService } from '../../services/projet';
import { Projet } from '../../models/project.model';

@Component({
  selector: 'app-detail-projet',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './detail-projet.html',
  styleUrls: ['./detail-projet.css'],
})
export class DetailProjet implements OnInit {
  projet: Projet | undefined;

  constructor(private route: ActivatedRoute, private projetService: ProjetService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isNaN(id)) this.projet = this.projetService.getProjetById(id);
  }
}
