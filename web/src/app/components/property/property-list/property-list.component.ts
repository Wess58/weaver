import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  standalone: false,
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss'
})
export class PropertyListComponent implements OnInit {

  filters: object | any = {};
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
  ]

  ngOnInit(): void {

  }

  clicked():void{
    console.log('here');
    
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
