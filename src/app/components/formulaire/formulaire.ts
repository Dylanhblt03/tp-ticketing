import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ApiService } from '../../api-service';

@Component({
  selector: 'app-formulaire',
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './formulaire.html',
  styleUrl: './formulaire.scss'
})
export class Formulaire implements OnInit {
  regions: any[] = [];
  departements: any[] = [];
  communes: any[] = [];
  formulaire!: FormGroup;
  envoye: boolean = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.formulaire = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      departement: ['', Validators.required], 
      commune: ['', Validators.required],
      sujet: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.apiService.fetchRegions().subscribe((reponse: any) => {
      this.regions = reponse;
    });
  }

  onRegionChange() {
    let regionCode = this.formulaire.get('region')?.value;
    this.apiService.fetchDepartements(regionCode).subscribe((reponse: any) => {
      this.departements = reponse;
      this.communes = [];
      this.formulaire.get('departement')?.setValue('');
      this.formulaire.get('commune')?.setValue('');
    });
  }

  onDeptChange() {
    let deptCode = this.formulaire.get('departement')?.value;
    this.apiService.fetchCommunes(deptCode).subscribe((reponse: any) => {
      this.communes = reponse;
      this.formulaire.get('commune')?.setValue('');
    });
  }

  onSubmit() {
    if (this.formulaire.valid && !this.envoye) {

      this.envoye = true; 

      let data = this.formulaire.value;
      let nomRegion = this.regions.find(r => r.code === data.region)?.nom;
      let nomDept = this.departements.find(d => d.code === data.departement)?.nom;

      let demande = new FormData();
      demande.append('nom', data.nom);
      demande.append('email', data.email);
      demande.append('region', nomRegion);
      demande.append('departement', nomDept);
      demande.append('commune', data.commune);
      demande.append('sujet', data.sujet);
      demande.append('message', data.message);

      this.apiService.sendEmail(demande).subscribe();
    }
  }
}