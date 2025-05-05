import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit, OnInit {

  title = "Localisation d'incident";

  lat!: number;
  lon!: number;
  city!: string;

  private map!: L.Map | L.LayerGroup<any>;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private markerService: MarkerService
  ) {}
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe( params => {
      this.lat = Number(params.get('lat'));
      this.lon = Number(params.get('lon'));
      this.city = String(params.get('city'));
  
      if ( this.lat == 0 || this.lon == 0 ) {
        this.router.navigate(['/displayAllIncident']);
      }
    });
  }

  private initMap(): void {
    this.map = this.markerService.iniMapService(this.lat, this.lon);
  }
  
  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCityMarker(this.map, this.lat, this.lon, this.city);
  }

}
