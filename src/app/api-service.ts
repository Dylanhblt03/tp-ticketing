import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  constructor(private monHttp: HttpClient) {}

  fetchRegions() {
    return this.monHttp.get('https://geo.api.gouv.fr/regions');
  }

  fetchDepartements(code: string) {
    return this.monHttp.get('https://geo.api.gouv.fr/regions/' + code + '/departements');
  }

  fetchCommunes(code: string) {
    return this.monHttp.get('https://geo.api.gouv.fr/departements/' + code + '/communes');
  }

  sendEmail(donnees: FormData) {
    return this.monHttp.post('http://exercice-api.loc/ticketing.php', donnees, {
      responseType: 'text'
    });
  }

  fetchDemandes() {
    return this.monHttp.get('http://exercice-api.loc/ticketing.php', {
      responseType: 'text'
    });
  }
}