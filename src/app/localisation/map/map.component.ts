import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class MapComponent implements OnChanges {

  title = "Localisation d'incident";

  private map!: L.Map | L.LayerGroup<any>;

  @Input() incidentLocation!: { lat?: string | undefined; lon?: string | undefined; city?: string | undefined; } | undefined;
  lat!: number;
  lon!: number;
  city!: string;

  constructor(
    private markerService: MarkerService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incidentLocation'] && this.incidentLocation?.lat && this.incidentLocation?.lon) {
      this.lat = Number(this.incidentLocation.lat);
      this.lon = Number(this.incidentLocation.lon);
      this.city = String(this.incidentLocation.city);
      
      if (this.lat !== 0 && this.lon !== 0) {
        this.initMap();
        this.markerService.makeCityMarker(this.map, this.lat, this.lon, this.city);
      }
    }
  }

  private initMap(): void {
    this.map = this.markerService.iniMapService(this.lat, this.lon);
  }

}
