import { Component } from '@angular/core';
import { TypeCas } from '../../../../gs-api/typedecas/typeCas';
import { TypeCasService } from '../../../../gs-api/typedecas/typeCas/type-cas.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { Router } from '@angular/router';
import { OrgExterneService } from '../../../../gs-api/OrganismeExternes/OrgExternes/org-externe.service';
import { OrgExterne } from '../../../../gs-api/OrganismeExternes/OrgExterne';

@Component({
  selector: 'add-type-cas',
  standalone: false,
  templateUrl: './add-type-cas.component.html',
  styleUrl: './add-type-cas.component.css'
})
export class AddTypeCasComponent {
  title = "Ajouter un type de cas";
  errorMsg = '';
  orgExternes: OrgExterne[] = [];
  typeCas: TypeCas = {
    destination: {}
  };

  constructor (
    private typeCaservice: TypeCasService,
    private orgExterneService: OrgExterneService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrgExterenes();
  }
  
  getOrgExterenes(): void {
    this.orgExterneService.getOrgExternes().subscribe({
      next: orgExternes => {
        this.orgExternes = orgExternes;
      },
      error: error => {
        alert(error.message);
      }
    });
  }

  addTypeCas(): void {
    this.typeCaservice.addTypeCas(this.typeCas).subscribe({
      next: () => {
        this.messageService.setMessage("Le type de cas '" + this.typeCas.type + "' a bien été ajouter");
        this.router.navigate(['/displayAllTypesCas']);
      },
      error: (error) => {
        this.errorMsg = error.error.message;
      }
    })
  }
}
