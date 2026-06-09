import { Projet, Competence, Experience, Message } from '../models/types';

export const initialProjects: Projet[] = [
  {
    id: 1,
    titre: 'Click2Print',
    description: 'Application web permettant aux clients de commander des impressions 3D en ligne. Interface intuitive pour l\'upload de modèles 3D, choix des matériaux et tarification en temps réel. Intègre un dashboard complet de gestion des commandes et suivi de production.',
    technologies: ['React', 'NestJS', 'TypeScript', 'Tailwind CSS', 'SQL'],
    statut: 'Publié',
    github: 'https://github.com/chakrisana/click2print',
    date: '2026-04-15'
  },
  {
    id: 2,
    titre: 'XploreIA',
    description: 'Plateforme moderne de marketplace pour les outils d\'intelligence artificielle, construite sur une architecture découplée React + Vite / PHP natif. Permet de rechercher, évaluer et commenter des outils d\'IA selon différents critères, avec possibilité de suggérer de nouveaux outils.',
    technologies: ['React', 'Vite', 'PHP', 'MySQL', 'Tailwind CSS'],
    statut: 'Publié',
    github: 'https://github.com/chakrisana/xploreia',
    date: '2026-03-10'
  },
  {
    id: 3,
    titre: 'DevFolio',
    description: 'Portfolio de développeur moderne conçu avec Angular. Présente de manière élégante les projets académiques et professionnels, les compétences techniques et les expériences. Back-office protégé avec authentification simulée et CRUD complet.',
    technologies: ['Angular', 'TypeScript', 'CSS', 'RxJS'],
    statut: 'Publié',
    github: 'https://github.com/chakrisana/devfolio',
    date: '2026-06-05'
  },
  {
    id: 4,
    titre: 'GestStock Pro',
    description: 'Application de gestion de stock pour PME avec alertes automatiques de rupture, rapports d\'inventaire exportables en PDF/Excel et tableau de bord analytique. Interface multi-utilisateurs avec gestion des rôles.',
    technologies: ['Java', 'JavaFX', 'SQL', 'PostgreSQL'],
    statut: 'Publié',
    github: 'https://github.com/chakrisana/geststock-pro',
    date: '2025-12-20'
  },
  {
    id: 5,
    titre: 'TaskFlow',
    description: 'Outil de gestion de tâches collaboratif inspiré de Kanban. Permet la création de boards, colonnes et cartes avec drag-and-drop, attribution aux membres d\'équipe et suivi des deadlines en temps réel.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    statut: 'Publié',
    github: 'https://github.com/chakrisana/taskflow',
    date: '2025-10-15'
  },
  {
    id: 6,
    titre: 'AlgoVisualizer',
    description: 'Outil pédagogique de visualisation d\'algorithmes de tri et de recherche. Animations fluides pas-à-pas avec contrôle de vitesse, comparaison de complexités et mode quiz interactif pour l\'apprentissage.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'C++'],
    statut: 'Publié',
    github: 'https://github.com/chakrisana/algovisualizer',
    date: '2025-07-05'
  },
  {
    id: 7,
    titre: 'SmartBudget',
    description: 'Application de suivi budgétaire personnel avec catégorisation automatique des dépenses, graphiques interactifs et alertes de dépassement de budget. Export des données en CSV et synchronisation cloud légère.',
    technologies: ['Angular', 'TypeScript', 'PHP', 'MySQL'],
    statut: 'Brouillon',
    github: 'https://github.com/chakrisana/smartbudget',
    date: '2026-02-10'
  },
  {
    id: 8,
    titre: 'SysMonitor',
    description: 'Outil de monitoring système léger écrit en C/Powershell permettant de surveiller l\'utilisation CPU, mémoire et disque, avec alertes configurables et logs rotatives. Interface CLI ergonomique.',
    technologies: ['C', 'Powershell', 'Bash'],
    statut: 'Publié',
    github: 'https://github.com/chakrisana/sysmonitor',
    date: '2025-05-20'
  },
  {
    id: 9,
    titre: 'E-Learning Platform',
    description: 'Plateforme d\'apprentissage en ligne avec streaming vidéo, quiz interactifs et système de progression. Intégration de paiements Stripe et gestion des certificats automatisée.',
    technologies: ['Angular', 'Node.js', 'Express', 'MongoDB'],
    statut: 'Brouillon',
    github: 'https://github.com/chakrisana/elearning',
    date: '2026-05-01'
  }
];

export const initialSkills: Competence[] = [
  {
    id: 1,
    nom: 'Angular',
    niveau: 'Avancé',
    icone: 'fa-brands fa-angular'
  },
  {
    id: 2,
    nom: 'JavaScript / React',
    niveau: 'Avancé',
    icone: 'fa-brands fa-react'
  },
  {
    id: 3,
    nom: 'Java',
    niveau: 'Avancé',
    icone: 'fa-brands fa-java'
  },
  {
    id: 4,
    nom: 'Bases de données / SQL',
    niveau: 'Avancé',
    icone: 'fa-solid fa-database'
  },
  {
    id: 5,
    nom: 'C / C++',
    niveau: 'Intermédiaire',
    icone: 'fa-solid fa-code'
  },
  {
    id: 6,
    nom: 'HTML / CSS / PHP',
    niveau: 'Avancé',
    icone: 'fa-brands fa-html5'
  },
  {
    id: 7,
    nom: 'TypeScript',
    niveau: 'Avancé',
    icone: 'fa-brands fa-js'
  },
  {
    id: 8,
    nom: 'Node.js',
    niveau: 'Intermédiaire',
    icone: 'fa-brands fa-node-js'
  },
  {
    id: 9,
    nom: 'Powershell',
    niveau: 'Intermédiaire',
    icone: 'fa-solid fa-terminal'
  },
  {
    id: 10,
    nom: 'UML & Modélisation',
    niveau: 'Avancé',
    icone: 'fa-solid fa-diagram-project'
  },
  {
    id: 11,
    nom: 'Algorithmique & Structures de données',
    niveau: 'Avancé',
    icone: 'fa-solid fa-brain'
  },
  {
    id: 12,
    nom: 'Programmation système',
    niveau: 'Intermédiaire',
    icone: 'fa-solid fa-gears'
  },
  {
    id: 13,
    nom: 'Git & GitHub',
    niveau: 'Avancé',
    icone: 'fa-brands fa-git-alt'
  },
  {
    id: 14,
    nom: 'Agile / Jira',
    niveau: 'Intermédiaire',
    icone: 'fa-brands fa-atlassian'
  },
  {
    id: 15,
    nom: 'Docker',
    niveau: 'Débutant',
    icone: 'fa-brands fa-docker'
  },
  {
    id: 16,
    nom: 'Spring Boot',
    niveau: 'Intermédiaire',
    icone: 'fa-solid fa-leaf'
  },
  {
    id: 17,
    nom: 'MongoDB',
    niveau: 'Intermédiaire',
    icone: 'fa-solid fa-leaf'
  },
  {
    id: 18,
    nom: 'Scrum',
    niveau: 'Intermédiaire',
    icone: 'fa-solid fa-rotate'
  },
  {
    id: 19,
    nom: 'Kanban',
    niveau: 'Avancé',
    icone: 'fa-solid fa-table-columns'
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 1,
    titre: 'Développeur Full-Stack Freelance',
    entreprise: 'Missions indépendantes – Casablanca & Remote',
    description: 'Développement d\'applications web sur mesure pour des clients locaux et internationaux. Création de sites e-commerce, dashboards analytics, et intégrations API. Utilisation des méthodes Agile pour la livraison itérative des fonctionnalités.',
    dateDebut: '2025-10-01',
    dateFin: 'Présent'
  },
  {
    id: 2,
    titre: 'Software Engineer Intern',
    entreprise: 'Google – Paris, France (Remote)',
    description: 'Stage au sein de l\'équipe Google Cloud Platform. Contribution au développement d\'outils d\'observabilité pour microservices : dashboards en temps réel, alerting automatisé et optimisation des pipelines de données distribuées.',
    dateDebut: '2025-06-01',
    dateFin: '2025-09-30'
  },
  {
    id: 3,
    titre: 'Backend Developer Intern',
    entreprise: 'OCP Group – Casablanca, Maroc',
    description: 'Intégration dans l\'équipe Digital Factory d\'OCP. Développement de microservices Java/Spring Boot pour la gestion des flux logistiques miniers. Mise en place de tests unitaires et documentation OpenAPI.',
    dateDebut: '2024-07-01',
    dateFin: '2025-03-31'
  },
  {
    id: 4,
    titre: 'Développeur Full-Stack (Stage académique)',
    entreprise: 'Casablanca Tech Solutions – Casablanca, Maroc',
    description: 'Conception et développement d\'une plateforme web de suivi de projet agile avec intégration d\'API tiers. Automatisation de rapports d\'activité hebdomadaires et mise en place d\'un CI/CD basique.',
    dateDebut: '2024-06-01',
    dateFin: '2024-08-31'
  },
  {
    id: 5,
    titre: 'Développeur Frontend Junior',
    entreprise: 'StartUp Innov – Rabat, Maroc',
    description: 'Développement de composants UI réutilisables en React pour une application SaaS de gestion RH. Collaboration avec l\'équipe UX/UI pour améliorer l\'accessibilité de la plateforme.',
    dateDebut: '2023-09-01',
    dateFin: '2024-05-31'
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

