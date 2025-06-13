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

  currentToggle: string = 'all';
  filters: object | any = {
    rooms: 0
    // priceStart: 10000,
    // priceEnd: 100000
  };
  openLocation = false;
  openPrice = false;
  openRooms = false;

  filteredLocations: any = [];
  priceRanges: any[] = [
    [1, 10000],
    [10001, 40000],
    [40001, 120000]
  ];


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

  kenyanCounties = ["Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta", "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"];


  @ViewChild('locationWrap') locationWrapRef!: ElementRef;
  @ViewChild('priceWrap') priceWrapRef!: ElementRef;
  @ViewChild('roomsWrap') roomsWrapRef!: ElementRef;


  @HostListener('document:click', ['$event']) onClick(event: any) {
    // console.log(event.target.attributes.id.nodeValue);
    this.openLocation = event.target?.attributes && event.target.attributes?.id && ['openLocationInput', 'openLocation'].includes(event.target.attributes.id?.nodeValue);
    // this.openPrice = event.target?.attributes && event.target.attributes?.id && ['openPriceInput', 'openPrice'].includes(event.target.attributes.id?.nodeValue);
    // this.openRooms = event.target?.attributes && event.target.attributes?.id && ['openRoomsInput', 'openRooms'].includes(event.target.attributes.id?.nodeValue);

    // this.openLocation = this.locationWrapRef?.nativeElement.contains(event.target);
    this.openPrice = this.priceWrapRef?.nativeElement.contains(event.target);
    this.openRooms = this.roomsWrapRef?.nativeElement.contains(event.target);


    console.log(this.openLocation, this.openPrice, this.openRooms);

    if (this.openLocation) {
      const input: HTMLInputElement = document.getElementById('openLocationInput') as HTMLInputElement;
      input?.focus();
      input?.select();
    }

    // if (event.target?.attributes && event.target.attributes?.id && event.target.attributes.id?.nodeValue === 'openDeviceList') {
    //   setTimeout(() => {
    //     const objDiv: any = document.getElementById("openDeviceList");
    //     // objDiv.scrollTo({ top: 10, behavior: 'smooth' });
    //     objDiv.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    //   }, 10);
    // }
  }

  ngOnInit(): void {

    this.searchLocation();
    this.properties = [...this.properties, ...this.properties, ...this.properties, ...this.properties];

  }

  selectToggle(tab: string): void {
    this.currentToggle = tab;
  }

  searchLocation(): void {
    this.filteredLocations = [];

    if (this.filters.location) {
      this.filteredLocations = this.kenyanCounties.filter((item: any) =>
        item.toLowerCase().includes(this.filters.location.toLowerCase().trim())
      );
    } else {
      this.filteredLocations = JSON.parse(JSON.stringify(this.kenyanCounties));
    }
  }

  selectLocation(item: any): void {
    this.filters.location = item;
    // this.selectedDevice = Object.assign({}, item);
  }

  updatePrice(event: Event) {
    console.log((event.target as HTMLInputElement).value);
    // this. = event.value;
  }

  selectPriceRange(range?: number[]): void {
    this.filters.priceStart = range ? range[0] : null;
    this.filters.priceEnd = range ? range[1] : null;
    this.filters.supriseRange = range ? null : 'No budget, no limits!';
  }

  checkIfActiveRange(range: number[]): boolean {
    return (this.filters.priceStart && this.filters.priceEnd) && +this.filters.priceStart === range[0] && +this.filters.priceEnd === range[1];
  }

  checkIfFilterExists(): boolean {
    return this.filters.location || this.filters.priceStart || this.filters.priceEnd || this.filters.rooms;
  }

  validateInputLimits(type: string): void {

    if (type === 'min' && (+this.filters.priceStart > +this.filters.priceEnd)) {
      setTimeout(() => {
        this.filters.priceStart = this.filters.priceEnd;
      }, 5)
    }

    if (type === 'max' && (+this.filters.priceEnd < +this.filters.priceStart)) {
      setTimeout(() => {
        this.filters.priceEnd = this.filters.priceStart;
      }, 5)
    }

    [undefined, null, ''].includes(this.filters.priceEnd) && this.filters.priceStart ? this.filters.priceEnd = this.filters.priceStart : '';
    [undefined, null, ''].includes(this.filters.priceStart) && this.filters.priceEnd ? this.filters.priceStart = (+this.filters.priceEnd <= 10000 ? this.filters.priceEnd : 10001) : '';

  }

  changeRoomsValues(type: string): void {
    type === 'plus' ? this.filters.rooms++ : this.filters.rooms--;
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
