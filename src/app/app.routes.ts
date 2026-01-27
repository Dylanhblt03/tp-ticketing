import { Routes } from '@angular/router';
import { Formulaire } from './components/formulaire/formulaire';
import { ListeDemande

 } from './components/liste-demande/liste-demande';
export const routes: Routes = [
  { 
    path: 'creer-ticket', 
    component: Formulaire 
  },
  {
    path: 'mes-demandes',
    component: ListeDemande
  },
  { 
    path: '', 
    redirectTo: 'creer-ticket', 
    pathMatch: 'full' 
  }
];