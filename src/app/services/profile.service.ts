import { Injectable, signal, computed } from '@angular/core';

export interface SpokenLanguage {
  id: number;
  flag: string;
  name: string;
  level: string;
}

export interface Interest {
  id: number;
  icon: string;
  label: string;
}

export interface ProfileData {
  cvDataUrl: string | null;
  spokenLanguages: SpokenLanguage[];
  interests: Interest[];
  softSkills: string[];
}

const DEFAULT_PROFILE: ProfileData = {
  cvDataUrl: null,
  spokenLanguages: [
    { id: 1, flag: '🇲🇦', name: 'Arabe', level: 'Langue maternelle' },
    { id: 2, flag: '🇫🇷', name: 'Français', level: 'Avancé' },
    { id: 3, flag: '🇺🇸', name: 'Anglais', level: 'Avancé' }
  ],
  interests: [
    { id: 1, icon: 'fa-solid fa-microphone', label: 'Chant' },
    { id: 2, icon: 'fa-solid fa-book-open-reader', label: 'Lecture' },
    { id: 3, icon: 'fa-solid fa-plane-departure', label: 'Voyage' },
    { id: 4, icon: 'fa-solid fa-palette', label: 'Art & Créativité' },
    { id: 5, icon: 'fa-solid fa-music', label: 'Musique' }
  ],
  softSkills: [
    'Organisation', 'Communication', 'Travail d\'équipe', 
    'Respect des délais', 'Esprit critique'
  ]
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly STORAGE_KEY = 'devfolio_profile_v1';
  
  private state = signal<ProfileData>(this.loadProfile());

  public profile = computed(() => this.state());
  public cvDataUrl = computed(() => this.state().cvDataUrl);
  public spokenLanguages = computed(() => this.state().spokenLanguages);
  public interests = computed(() => this.state().interests);
  public softSkills = computed(() => this.state().softSkills);

  constructor() {}

  private loadProfile(): ProfileData {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try { 
        return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
      } catch { /* corrupted */ }
    }
    return DEFAULT_PROFILE;
  }

  private saveProfile(newData: ProfileData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newData));
      this.state.set(newData);
    } catch (e) {
      console.error('Failed to save profile. Storage might be full (Base64 PDF is too large).', e);
      // We still update the state so it works in current session
      this.state.set(newData);
    }
  }

  updateCvUrl(dataUrl: string | null): void {
    this.saveProfile({ ...this.state(), cvDataUrl: dataUrl });
  }

  updateLanguages(languages: SpokenLanguage[]): void {
    this.saveProfile({ ...this.state(), spokenLanguages: languages });
  }

  updateInterests(interests: Interest[]): void {
    this.saveProfile({ ...this.state(), interests: interests });
  }

  updateSoftSkills(softSkills: string[]): void {
    this.saveProfile({ ...this.state(), softSkills: softSkills });
  }
}
