import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  iniMapService(lat: number, lon: number): L.Map {
    const map = L.map('map', {
      center: [lat, lon],
      zoom: 16,
      zoomControl: true,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(map);

    setTimeout(() => {
      map.invalidateSize();
    }, 0);

    return map;
  }


  makeCityMarker(map: L.Map | L.LayerGroup<any>, lat: number, lon: number, city: string): void {
    const safeCity = city.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // éviter injection HTML

    const marker = L.marker([lat, lon], {
      title: `Incident à ${safeCity}`, // info-bulle au survol
    });

    marker
      .addTo(map)
      .bindPopup(`<b>Incident à ${safeCity}</b>`); // popup au clic

    // Facultatif : ouvrir directement la popup
    // marker.openPopup();
  }

}
