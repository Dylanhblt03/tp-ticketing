import { Component, signal } from '@angular/core';
import { Menu } from './components/menu/menu';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth-service';

@Component({
  selector: 'app-root',
  imports: [Menu, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly title = signal('tp-form-contact');

  constructor(private authService:AuthService) {

    this.authService.fetchJwtToken().subscribe({
      next: () => {},
      error: (err) => {
        console.error('Impossible de récupérer le JWT');
        console.log(err);
      }
    });

  }
}