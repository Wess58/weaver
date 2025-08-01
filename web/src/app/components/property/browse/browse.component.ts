import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

import { PLACEHOLDER_PROPERTIES } from '../../../app.constants';

@Component({
  selector: 'app-browse',
  standalone: false,
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
  animations: [
    trigger('fadeInGrow', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, marginTop: 30 }),
          stagger('80ms', [
            animate('500ms ease-in-out', style({ opacity: 1, marginTop: 0 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class BrowseComponent implements OnInit {


  currentView: string = window.innerWidth < 1100 ? 'grid' : 'all';
  properties: any[] = [];
  filters: any = {};
  showMap: boolean = false;
  visibleMap: boolean = window.innerWidth > 1100;
  loadingProperties: boolean = false;


  page: number = 1;
  itemsPerPage = 20;
  totalLength: any;


  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.visibleMap = (event.target as Window).innerWidth > 1100;
  }

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        // console.log(this.activatedRoute.snapshot.queryParams);

        this.page = this.activatedRoute.snapshot.queryParams['page'];
        this.filters.spr = this.activatedRoute.snapshot.queryParams['spr'] === 'true';
        this.filters.priceStart = this.filters?.spr ? 1 : (+this.activatedRoute.snapshot.queryParams['priceStart'] || 1);
        this.filters.priceEnd = this.filters?.spr ? 1000000000 : (+this.activatedRoute.snapshot.queryParams['priceEnd'] || 1000000000);
        this.filters.location = this.activatedRoute.snapshot.queryParams['location'] ?? '';
        this.filters.rooms = +this.activatedRoute.snapshot.queryParams['rooms'];

        this.getProperties();
      }
    });
  }

  ngOnInit(): void {
    this.page = +this.activatedRoute.snapshot.queryParams['page'] || 1;
    this.reInitMap();
    setTimeout(() => {
      this.properties = new Array(10).fill(PLACEHOLDER_PROPERTIES).flat();
      // [...this.properties, ...this.properties, ...this.properties];

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
    // filters
  }



  viewToggle(view: string): void {
    if (this.currentView !== view && view !== 'grid') this.reInitMap();
    this.currentView = view;
  }


  reInitMap(): void {
    this.showMap = false;
    setTimeout(() => this.showMap = true);
  }

  getProperties(page: number = 1): void {

    this.loadingProperties = true;

    this.page = page ?? 1;
    // this.properties = [];

    const options: any = {
      pageSize: this.itemsPerPage,
      pageNo: this.page - 1,
      sort: 'id,desc',
      ...this.filters
    }

    delete options.spr;

    // console.log(options);
    // console.log(this.filters);


  }


}
