import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private monHttpClient: HttpClient) {}

  // On appelle l'URL de login
  fetchJwtToken() {
    // On type la réponse attendue de la requête GET
    // Ici on utilise pipe plutôt que subscribe car on ne lance pas une opération à la réception du token, on décrit simplement ce qui va se passer
    // Et tap() se déclenche normalement sans permettre la modification de response, ce qui le différencie de next()
    return this.monHttpClient.get<{ token: string }>('http://exercice-api.loc/jwt-login.php').pipe(
      tap(response => {
        localStorage.setItem('api_jwt', response.token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('api_jwt');
  }

  clearToken(): void {
    localStorage.removeItem('api_jwt');
  }

}
