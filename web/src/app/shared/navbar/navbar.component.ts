import { Component, OnInit, HostListener } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(400, style({ opacity: 1 })),
      ]),
    ]),
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0px', opacity: 0, overflow: 'hidden' }),
        animate('300ms ease', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('200ms ease', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavbarComponent {

  morphNavbar = false;
  heightState: boolean = false;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    // console.log($event);
    // console.log("scrolling", window.pageYOffset);

    this.morphNavbar = (window.innerWidth > 770 && ((window.pageYOffset / window.innerHeight * 100) > 10)) || (window.innerWidth < 770 && ((window.pageYOffset / window.innerHeight * 100) > 60));
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {

    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        this.heightState = false;
      }
    });
  }

  handleState(value: boolean) {
    this.heightState = value;
  }

  browseProperties(type: string): void {
    this.router.navigate(['/browse'], {
      queryParams: {
        type
      }
    })
  }
}
