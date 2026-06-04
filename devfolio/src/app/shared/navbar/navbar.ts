import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  theme = 'dark';

  toggleTheme(): void {
    const body = document.body;
    body.classList.toggle('light');
    body.classList.toggle('dark');
    this.theme = body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('devfolio-theme', this.theme);
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('devfolio-theme');
    const body = document.body;
    if (stored === 'light') {
      body.classList.add('light');
      body.classList.remove('dark');
      this.theme = 'light';
    } else {
      body.classList.add('dark');
      body.classList.remove('light');
      this.theme = 'dark';
    }
  }
}
