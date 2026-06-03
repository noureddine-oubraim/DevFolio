export interface Projet {
  id: number;
  titre: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  statut: 'publie' | 'brouillon' | 'prive';
  dateCreation: Date;
}

export interface Competence {
  id: number;
  nom: string;
  categorie: 'frontend' | 'backend' | 'outils';
  niveau: number;
  pourcentage?: number;
}