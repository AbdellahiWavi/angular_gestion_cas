import { Component } from '@angular/core';
import { OrgExterneService } from '../../../../gs-api/OrganismeExternes/OrgExternes/org-externe.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { Router } from '@angular/router';
import { OrgExterne } from '../../../../gs-api/OrganismeExternes/OrgExterne';

@Component({
  selector: 'add-org-externe',
  standalone: false,
  templateUrl: './add-org-externe.component.html',
  styleUrl: './add-org-externe.component.css'
})
export class AddOrgExterneComponent {
  title = "Ajouter un organisme externe";
  errorMsg = '';
  file!: File | null;
  orgExterne: OrgExterne = {};
  imgUrl: string | ArrayBuffer = 'assets/images/author.jpg';
  imgOrgLocation: string = '';
  
  constructor (
    private orgExterneservice: OrgExterneService,
    private messageService: MessageService,
    private router: Router
  ) {}
  
  addOrgExterne(): void {
    this.orgExterne = {
      ...this.orgExterne,
      name: this.orgExterne.name?.toUpperCase(),
      image: this.imgOrgLocation,
    }
    this.orgExterneservice.addOrgExterne(this.orgExterne).subscribe({
      next: () => {
        this.messageService.setMessage("L'organisme externe '" + this.orgExterne.name + "' a bien été ajouter");
        this.router.navigate(['/displayAllOrgExternes']);
      },
      error: (error) => {
        this.errorMsg = error.error.message;
      }
    })
  }
  
  onFileIput(files: FileList | null) {
    if (files) {
      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = () => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        }
        const formData = new FormData();
        formData.append('file', this.file);
        this.orgExterneservice.uploadImg(formData).subscribe({
          next: (url: string) => {
            this.imgOrgLocation = url;
          }, error: error => {
            console.error('Erreur lors de l\'upload', error);
            this.errorMsg = error.error?.message || 'Erreur inconnue';
          }
        });
      }
    }
  }
  
}
