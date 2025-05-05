import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  iniMapService(lat: number, lon: number): L.Map {
    const map = L.map('map', {
      center: [ lat, lon ],
      zoom: 14
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    
    tiles.addTo(map);
    return map;
  }

  makeCityMarker(map: L.Map | L.LayerGroup<any>, lat: number, lon: number, city: string): void {
    const marker = L.marker([lat, lon]);
    marker.addTo(map);
    marker.bindPopup(`<b>l'incident à ${city}</b>`).openPopup();
  }
}
