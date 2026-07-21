import { Projet, Competence, Experience, Message } from '../models/types';

export const PROJECTS_DB_VERSION = 6;

export const initialProjects: Projet[] = [
  {
    id: 1,
    titre: 'Click2Print',
    description: 'Application web permettant aux clients de commander des impressions 3D. Interface utilisateur intuitive pour l’upload de modèles 3D et le choix des matériaux. Gestion des commandes et suivi de production.',
    technologies: ['React', 'NestJS'],
    statut: 'Publié',
    github: 'https://github.com/noureddine-oubraim/Click2Print',
    date: '2026-05-01',
    contexte: 'Projet académique',
    role: 'Développeur Full-Stack',
    duree: '3 mois',
    defis: ['Upload de modèles 3D', 'Suivi de production en temps réel']
  },
  {
    id: 2,
    titre: 'XplorIA',
    description: 'Plateforme de présentation d’outils d’IA avec côté client pour rechercher et suggérer des LLMs non répertoriés. Côté admin pour la gestion des clients et des LLMs. Chatbot intégré pour une interaction utilisateur améliorée.',
    technologies: ['React', 'PHP'],
    statut: 'Publié',
    github: 'https://github.com/noureddine-oubraim/XploreIA',
    date: '2026-04-01',
    contexte: 'Projet académique',
    role: 'Développeur Full-Stack',
    duree: '2 mois',
    defis: ['Intégration d’un Chatbot', 'Gestion admin complète']
  },
  {
    id: 3,
    titre: 'DevFolio',
    description: 'Application web de portfolio moderne pour un programmeur. Présentation des projets, compétences et expériences professionnelles.',
    technologies: ['Angular', 'TypeScript', 'CSS'],
    statut: 'Publié',
    github: 'https://github.com/noureddine-oubraim/DevFolio',
    date: '2026-06-01',
    contexte: 'Projet de portfolio personnel',
    role: 'Développeur Frontend',
    duree: '1 mois',
    defis: ['Design moderne et responsive', 'Animations CSS']
  },
  {
    id: 4,
    titre: 'Gestion de location de voitures',
    description: 'Application desktop avec interface Swing et backend Java. Fonctionnalités : ajout de véhicules, gestion des locations, suivi des clients et historique des locations.',
    technologies: ['Java', 'Swing'],
    statut: 'Publié',
    github: '',
    date: '2025-12-01',
    contexte: 'Projet académique',
    role: 'Développeur Java',
    duree: '2 mois',
    defis: ['Architecture MVC en Java', 'Interface graphique Swing intuitive']
  }
];

export const initialSkills: Competence[] = [
  { id: 1, nom: 'Java', niveau: 'Intermédiaire', icone: 'fa-brands fa-java' },
  { id: 2, nom: 'UML & Modélisation', niveau: 'Avancé', icone: 'fa-solid fa-diagram-project' },
  { id: 3, nom: 'SQL', niveau: 'Avancé', icone: 'fa-solid fa-database' },
  { id: 4, nom: 'Programmation système', niveau: 'Intermédiaire', icone: 'fa-solid fa-gears' },
  { id: 5, nom: 'Algorithmique & Structures de données', niveau: 'Avancé', icone: 'fa-solid fa-brain' },
  { id: 6, nom: 'React', niveau: 'Avancé', icone: 'fa-brands fa-react' },
  { id: 7, nom: 'JavaScript', niveau: 'Avancé', icone: 'fa-brands fa-js' },
  { id: 8, nom: 'Angular', niveau: 'Intermédiaire', icone: 'fa-brands fa-angular' },
  { id: 9, nom: 'C', niveau: 'Avancé', icone: 'fa-solid fa-code' },
  { id: 10, nom: 'C++', niveau: 'Intermédiaire', icone: 'fa-solid fa-code' },
  { id: 11, nom: 'Powershell', niveau: 'Intermédiaire', icone: 'fa-solid fa-terminal' },
  { id: 12, nom: 'HTML & CSS', niveau: 'Avancé', icone: 'fa-brands fa-html5' },
  { id: 13, nom: 'PHP', niveau: 'Intermédiaire', icone: 'fa-brands fa-php' },
  { id: 14, nom: 'Scrum', niveau: 'Intermédiaire', icone: 'fa-solid fa-rotate' }
];

export const initialExperiences: Experience[] = [
  {
    id: 1,
    titre: 'Cycle d’Ingénieur – ILISI',
    entreprise: 'FST Mohammedia',
    description: 'Ingénierie Logicielle et Intégration des Systèmes Informatiques.',
    dateDebut: '2025',
    dateFin: '2028'
  },
  {
    id: 2,
    titre: 'Bac +2 – Mathématiques & Informatique (MIP)',
    entreprise: 'FST Mohammedia',
    description: 'Formation fondamentale en mathématiques, algorithmique et programmation.',
    dateDebut: '2023',
    dateFin: '2025'
  },
  {
    id: 3,
    titre: 'Baccalauréat',
    entreprise: 'Lycée Al Farabi – Casablanca',
    description: 'Obtention du baccalauréat.',
    dateDebut: '2020',
    dateFin: '2023'
  }
];

export const initialMessages: Message[] = [
  {
    id: 1,
    nom: 'Sofia Benali',
    email: 'sofia.benali@techcorp.ma',
    sujet: 'Collaboration sur un projet React',
    message: 'Bonjour Chakri Sana, j\'ai découvert votre portfolio et je suis impressionnée par la qualité de vos projets. Nous recherchons un développeur React pour une mission de 3 mois sur notre plateforme e-commerce. Seriez-vous disponible pour un entretien cette semaine ?',
    date: '06/06/2026 à 14:32'
  },
  {
    id: 2,
    nom: 'Mehdi Lahlou',
    email: 'mehdi.lahlou@startup.io',
    sujet: 'Opportunité freelance – Angular Dashboard',
    message: 'Salut ! Je gère une startup fintech à Casablanca et nous avons besoin d\'un développeur Angular pour construire un dashboard de reporting financier. Budget prévu : 15 000 MAD. Est-ce que vous êtes disponible et intéressé ?',
    date: '04/06/2026 à 09:15',
  },
  {
    id: 3,
    nom: 'Amina Tazi',
    email: 'amina.tazi@university.ac.ma',
    sujet: 'Question sur votre projet XploreIA',
    message: 'Bonjour, je suis étudiante en master IA à Mohammedia. J\'ai vu votre projet XploreIA et je voudrais comprendre comment vous avez architecturé la partie recherche et filtrage. Pourriez-vous partager quelques détails techniques ?',
    date: '01/06/2026 à 16:45'
  }
];

