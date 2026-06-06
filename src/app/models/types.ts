export interface Projet {
  id: number;
  titre: string;
  description: string;
  technologies: string[];
  statut: 'Publié' | 'Brouillon';
  github?: string;
  date?: string;
}

export interface Competence {
  id: number;
  nom: string;
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé';
  icone: string;
}

export interface Message {
  id: number;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  date: string;
  reponse?: string;
}

export interface Experience {
  id: number;
  titre: string;
  entreprise: string;
  description: string;
  dateDebut: string;
  dateFin: string;
}


