import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProjetService } from '../../../services/projet.service';
import { Projet } from '../../../models/types';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  private projetService = inject(ProjetService);

  id = input<string>();

  get projet(): Projet | undefined {
    return this.projetService.getProjectById(+(this.id() ?? 0));
  }
}
