import { Component, OnInit, HostListener, ViewChild, ElementRef, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
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
        style({ opacity: 0, marginTop: -50 }),
        animate("300ms ease-in-out", style({ opacity: 1, marginTop: 0 })),
      ]),
      transition(':leave', [
        // :enter is alias to 'void => *'
        style({ opacity: 1, marginTop: 0 }),
        animate("100ms ease-in-out", style({ opacity: 0, marginTop: -100 })),
      ]),
    ]),
    trigger('fadeInDown', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0, marginTop: -100 }),
        animate("300ms ease-in-out", style({ opacity: 1, marginTop: 0 })),
      ]),
      transition(':leave', [
        // :enter is alias to 'void => *'
        style({ opacity: 1, marginTop: 0 }),
        animate("200ms ease-in-out", style({ opacity: 0, marginTop: -100 })),
      ]),
    ]),
  ],
})
export class SearchWidgetComponent implements OnInit, OnChanges {


  currentToggle: string = 'all';
  showWideWidget = false;
  filters: object | any = {
    rooms: 1
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
  @Input() morphNavbar: boolean = false;

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
    this.showWideWidget = this.miniWidgetRef?.nativeElement.contains(event.target);
    // this.router.url?.length < 2 || (this.router.url?.length > 2 && this.miniWidgetRef?.nativeElement.contains(event.target));
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
    private activatedRoute: ActivatedRoute,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        this.showWideWidget = false;
        this.widgetHeight.emit(false);

        if (this.router.url.includes('browse') && this.activatedRoute.snapshot.queryParams['spr']) {
          this.filters.spr = this.activatedRoute.snapshot.queryParams['spr'] === 'true';
          this.filters.supriseRange = this.filters.spr ? 'No budget, no limits!' : null;
          this.filters.priceStart = this.filters?.spr ? 1 : (+this.activatedRoute.snapshot.queryParams['priceStart'] || 1);
          this.filters.priceEnd = this.filters?.spr ? 1000000000 : (+this.activatedRoute.snapshot.queryParams['priceEnd'] || 1000000000);
          this.filters.location = this.activatedRoute.snapshot.queryParams['location'] ?? '';
          this.filters.rooms = +this.activatedRoute.snapshot.queryParams['rooms'];
        }
      }
    });
  }

  ngOnInit(): void {
    this.searchLocation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['morphNavbar']) {
    //   this.morphNavbar = this.morphNavbar;
    // }
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

    setTimeout(() => {
      this.openPrice = !this.filters.priceStart && !this.filters.supriseRange;
      this.openRooms = !this.openPrice && this.filters.rooms === 0;
    }, 100);
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
    return this.filters.location?.length || this.filters.priceStart || this.filters.priceEnd || this.filters?.supriseRange?.length || this.filters.rooms > 1;
  }

  showRoomValue(): boolean {
    return this.filters.location?.length || this.filters.priceStart || this.filters.priceEnd || this.filters?.supriseRange?.length;
  }

  validateInputLimits(type: string): void {

    this.filters.supriseRange = null;

    if (type === 'min' && (+this.filters.priceStart > +this.filters.priceEnd)) {
      setTimeout(() => {
        this.filters.priceStart = this.filters.priceEnd;
      }, 5)
    }

    if (type === 'max' && (+this.filters.priceEnd < +this.filters.priceStart)) {
      setTimeout(() => {
        this.filters.priceEnd = +this.filters.priceStart;
      }, 5)
    }

    [undefined, null, ''].includes(this.filters.priceEnd) && this.filters.priceStart ? this.filters.priceEnd = this.filters.priceStart : '';
    [undefined, null, ''].includes(this.filters.priceStart) && this.filters.priceEnd ? this.filters.priceStart = (+this.filters.priceEnd <= 10000 ? this.filters.priceEnd : 10001) : '';

  }

  changeRoomsValues(type: string): void {
    type === 'plus' ? this.filters.rooms++ : this.filters.rooms--;
  }


  redirectToBrowser(): void {
    setTimeout(() => {
      this.showWideWidget = false;
      this.widgetHeight.emit(this.showWideWidget);
    }, 0);



    this.router.navigate(['/browse'], {
      // relativeTo: this.router.url.includes('browse') ? this.activatedRoute : ['/browse'],
      queryParams: {
        page: 1,
        spr: this.filters.supriseRange !== null,
        priceStart: this.filters?.supriseRange?.length ? 1 : (+this.filters.priceStart || 1),
        priceEnd: this.filters?.supriseRange?.length ? 1000000000 : (+this.filters.priceEnd || 1000000000),
        location: this.filters?.location?.trim() ?? '',
        rooms: this.filters.rooms
      },
      // queryParamsHandling: 'merge',
    });
  }

}
