import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { PLACEHOLDER_MAP_POINTS } from '../../app.constants';
import * as L from 'leaflet';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-map-widget',
  standalone: false,
  templateUrl: './map-widget.component.html',
  styleUrl: './map-widget.component.scss'
})
export class MapWidgetComponent implements OnChanges, OnInit {

  apartmentLocations: any[] = PLACEHOLDER_MAP_POINTS;

  map!: L.Map;
  normalIcon = L.icon({
    iconUrl: 'assets/images/home-marker.png',
    iconSize: [40, 40],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
    className: 'icon-home-marker'
  });

  currentIcon = L.icon({
    iconUrl: 'assets/images/main-home-marker.png',
    iconSize: [40, 40],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
    className: 'icon-home-marker'
  });

  @Input() properties: any = [];


  constructor(
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {

    this.apartmentLocations[0].isCurrent = true;
    this.apartmentLocations[0].icon = this.currentIcon;
    this.initMap();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['properties']) {
      // this.initMap();
    }
  }

  initMap(): void {
    // this.map = L.map('map').setView([52.52, 13.405], 13);

    const kenyaBounds = L.latLngBounds(
      [-5.2, 33.5],  // Southwest corner (lat, lng)
      [5.2, 42.1]    // Northeast corner (lat, lng)
    );

    this.map = L.map('map', {
      center:
        [-1.1612, 36.8304], // center to be current item location
      // [0.0236, 37.9062],   // Kenya center
      zoom: 14,
      maxBounds: kenyaBounds,
      maxBoundsViscosity: 1.0,     // Fully lock the user within bounds
    });

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors',
    // }).addTo(this.map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      minZoom: 8,
      maxZoom: 16
    }).addTo(this.map);


    this.addMarkers();

  }

  addMarkers(): void {


    this.apartmentLocations.forEach((apt: any, index: number) => {
      const maker = L.marker([apt.lat, apt.lng], { icon: apt.icon ?? this.normalIcon })
        .addTo(this.map);
      // .bindTooltip({ permanent: false, direction: 'top' })

      if (!apt.isCurrent) {
        maker.bindPopup(`
          <span class="title">${apt.name}</span>
          <span class="price">${'KES ' + (this.apiService.transformPrice(apt.price ?? 10000)) + (apt.isRental ? " / month" : "")}</span>
          <span class="desc">${apt.description}</span>
          <a class="btn btn-view" id="btn-${index + 1}"> View </a>`, {
          offset: L.point(20, 0),
          maxWidth: 200,
          minWidth: 200,
          closeButton: false,
          closeOnEscapeKey: true
        })
          .openTooltip() // Optional: open on load
          .on('popupopen', () => {
            const btn = document.getElementById(`btn-${index + 1}`);
            btn?.addEventListener('click', () => {
              console.log(`Clicked marker ${index + 1}`);
            });
          });
      }
    });
  }


}
