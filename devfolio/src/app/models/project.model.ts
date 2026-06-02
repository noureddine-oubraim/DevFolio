export interface Projet {
  id: number;
  titre: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  statut: 'publié' | 'brouillon' | 'privé';
  dateCreation: Date;
}

export interface Competence {
  id: number;
  nom: string;
  categorie: 'frontend' | 'backend' | 'outils';
  niveau: number;
  pourcentage?: number;
}