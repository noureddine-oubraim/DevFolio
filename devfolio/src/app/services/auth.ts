import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Auth {
  private connecte = signal(false);

  estConnecte(): boolean { return this.connecte(); }

  connecter(login: string, mdp: string): boolean {
    if (login === 'admin' && mdp === 'admin123') {
      this.connecte.set(true);
      return true;
    }
    return false;
  }

  deconnecter(): void { this.connecte.set(false); }
}