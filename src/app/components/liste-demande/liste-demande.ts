import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api-service';

@Component({
  selector: 'app-liste-demande',
  imports: [CommonModule],
  templateUrl: './liste-demande.html',
  styleUrl: './liste-demande.scss'
})
export class ListeDemande implements OnInit {
  
  mesDemandes: any[] = []; 

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

ngOnInit() {
  this.api.fetchDemandes().subscribe((reponse: any) => {
    if (typeof reponse === 'string') {
      this.mesDemandes = JSON.parse(reponse.trim());
    } else {
      this.mesDemandes = reponse;
    }
    this.cdr.detectChanges();
  });
}
}
