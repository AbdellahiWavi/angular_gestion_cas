import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceIncidentService } from '../../../gs-api/incident/inc/service-incident.service';
import { Incident } from '../../../gs-api/incident/incident';

@Component({
  selector: 'app-afficher-incident',
  standalone: false,
  templateUrl: './afficher-incident.component.html',
  styleUrl: './afficher-incident.component.css'
})
export class AfficherIncidentComponent implements OnInit{

  id!: number;
  incident: Incident = {};
  title = "Détails de l'incident";
  
  constructor (
    private incidentService: ServiceIncidentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe( params => {
      this.id = Number(params.get('id'));
      
      if (!this.id) {
        this.router.navigate(['/displayAllIncident']);
      } else {
        this.getIncident(this.id); // appeler ici
      }
    });
  }
  
  getIncident(id: number) {
    this.incidentService.getIncident(id).subscribe({
      next: incident => {
        this.incident = incident;
        this.title = `Incident #${this.incident.id}`;
      }, error: error => {
        alert(error.message);
      }
    })
  }

  getFileType(fileUrl: string | undefined): 'image' | 'video' | 'unknown' {
    if (typeof fileUrl === 'string') {
      const extension = fileUrl.split('.').pop()?.toLowerCase();
      if (!extension) return 'unknown';
    
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'mkv', 'webm'];
    
      if (imageExtensions.includes(extension)) return 'image';
      if (videoExtensions.includes(extension)) return 'video';
    }
    return 'unknown';
  }
  
}
