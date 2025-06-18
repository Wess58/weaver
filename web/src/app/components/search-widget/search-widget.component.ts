import { Component, OnInit, HostListener, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-search-widget',
  standalone: false,
  templateUrl: './search-widget.component.html',
  styleUrl: './search-widget.component.scss',
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
    trigger('fadeInDownMini', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0, transform: 'scale(1.5)' }),
        animate("250ms ease-in-out", style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        // :enter is alias to 'void => *'
        style({ opacity: 1, marginTop: 0, transform: 'scale(1)' }),
        animate("200ms", style({ opacity: 0, marginTop: -50, transform: 'scale(0.75)' })),
      ]),
    ]),
    trigger('fadeInDown', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0, marginTop: -50, transform: 'scale(0.75)' }),
        animate("300ms ease-in-out", style({ opacity: 1, marginTop: 0, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        // :enter is alias to 'void => *'
        style({ opacity: 1, marginTop: 0, transform: 'scale(1)' }),
        animate("100ms", style({ opacity: 0, marginTop: -50, transform: 'scale(0.75)' })),
      ]),
    ]),
  ],
})
export class SearchWidgetComponent implements OnInit {


  currentToggle: string = 'all';
  showWideWidget = false;
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

  kenyanCounties = ["Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta", "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"];

  @Output() widgetHeight = new EventEmitter<boolean>();


  @ViewChild('miniWidget') miniWidgetRef!: ElementRef;
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
    this.showWideWidget = this.router.url?.length < 2 || (this.router.url?.length > 2 && this.miniWidgetRef?.nativeElement.contains(event.target));
    this.widgetHeight.emit(this.showWideWidget);
    // console.log(this.openLocation, this.openPrice, this.openRooms, this.showWideWidget);

    if (this.openLocation) {
      setTimeout(() => {
        const input: HTMLInputElement = document.getElementById('openLocationInput') as HTMLInputElement;
        input?.focus();
        input?.select();
      }, 100);
    }

    // if (event.target?.attributes && event.target.attributes?.id && event.target.attributes.id?.nodeValue === 'openDeviceList') {
    //   setTimeout(() => {
    //     const objDiv: any = document.getElementById("openDeviceList");
    //     // objDiv.scrollTo({ top: 10, behavior: 'smooth' });
    //     objDiv.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    //   }, 10);
    // }
  }


  constructor(
    public router: Router,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        this.showWideWidget = this.router.url?.length < 2;
        // this.widgetHeight.emit(false);
        // console.log(val);
        // this.showWideWidget = false;
      }
    });
  }

  ngOnInit(): void {
    this.searchLocation();
  }


  selectToggle(tab: string): void {
    this.currentToggle = tab;
  }

  trimLocation(): void {
    // this.filters.location = this.filteredLocations.location.trim();
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

}
