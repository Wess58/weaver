import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-detail',
  standalone: false,
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit {

  property: any = {
    name: '',
    description: 'Small summer garden house with large terrace surrounded by greenery. It\'s kind of like a hotel room by the forest.The special thing about it is that a gable wall is completely glazed.It is located in the garden of Villa Sunnyside, above Pillnitz Castle.Not properly heatable, therefore only bookable in summer/ autumn!',
    location: 'Pilintz',
    type: 'Tiny Home',
    price: 25000,
    availability: true,
    isRental: true,
    rooms: 1,
    imageUrl: ['../../../../assets/images/img3.webp'],
    amenities:[
      'Garden view', 'Private entrance', 'Private backyard', 'Free parking on premises', 'Hot water', 'Wifi', 'induction stove', 'Washer – In unit', 'Heating and cooling', 'Smoke alarm', 'Fire extinguisher', 'Carbon monoxide alarm', 'First aid kit', 'Security cameras on property'
    ]
  };


  constructor() {

  }

  ngOnInit(): void {

    this.property.imageUrl = [...this.property.imageUrl, ...this.property.imageUrl, ...this.property.imageUrl, ...this.property.imageUrl];

  }
}
