import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { Incident } from '../../../gs-api/incident/incident';

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
export class MapComponent implements OnChanges {

  title = "Localisation d'incident";

  private map!: L.Map | L.LayerGroup<any>;

  @Input() incident!: Incident;

  constructor(
    private markerService: MarkerService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incident'] && this.incident?.userLocation?.latitude && this.incident?.userLocation?.longitude) {
      const lat = Number(this.incident.userLocation?.latitude);
      const lon = Number(this.incident.userLocation?.longitude);
      const city = String(this.incident.county);
      
      if (lat !== 0 && lon !== 0) {
        this.initMap(lat, lon);
        this.markerService.makeCityMarker(this.map, lat, lon, city);
      }
    }
  }

  private initMap(lat: number, lon: number): void {
    this.map = this.markerService.iniMapService(lat, lon);
  }

}
