import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'devfolio_auth';
  
  // Signal to hold authentication state
  isLoggedIn = signal<boolean>(this.checkInitialAuth());

  constructor() {}

  private checkInitialAuth(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  login(username: string, password: string): boolean {
    // Simulated auth (mock)
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem(this.AUTH_KEY, 'true');
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.isLoggedIn.set(false);
  }
}
