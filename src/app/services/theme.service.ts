import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'devfolio_theme';
  
  // Signal to hold current theme (true = dark mode, false = light mode)
  isDarkMode = signal<boolean>(this.checkInitialTheme());

  constructor() {
    // Effect to apply the theme to the body and save it whenever it changes
    effect(() => {
      const isDark = this.isDarkMode();
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');
    });
  }

  private checkInitialTheme(): boolean {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Fallback to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  }

  toggleTheme(): void {
    this.isDarkMode.update(current => !current);
  }
}
