import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-property-list',
  standalone: false,
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeInPopUp', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0, marginTop: 20 }),
        animate("220ms ease-in-out", style({ opacity: 1, marginTop: 0 })),
      ]),
    ]),
  ],
})
export class PropertyListComponent implements OnInit {


  properties: any[] = [
    {
      name: 'SK Suites Apartments',
      location: 'AltStadt',
      type: 'Condo',
      price: 20000,
      availability: false,
      isRental: true,
      rooms: 2,
      imageUrl: '../../../../assets/images/img2.webp'
    },
    {
      name: '',
      location: 'Pilintz',
      type: 'Tiny Home',
      price: 25000,
      availability: true,
      isRental: true,
      rooms: 1,
      imageUrl: '../../../../assets/images/img3.webp'
    },
    {
      name: '',
      location: 'Stralsund',
      type: 'Bungalow',
      price: 2200000,
      availability: true,
      isRental: false,
      rooms: 5,
      imageUrl: '../../../../assets/images/img4.avif'
    }
  ];


  ngOnInit(): void {

    this.properties = [...this.properties, ...this.properties, ...this.properties, ...this.properties];
    window.scrollTo({ top: 0, behavior: 'smooth' })

  }

  slugify(str: string): string {
    return str.replace(/[()]/g, '').replace(/\s/g, '-').toLowerCase();
  }


  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }
}
