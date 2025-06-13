import { Component, OnInit, HostListener } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

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
  ],
})
export class NavbarComponent {

  morphNavbar = false;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    // console.log($event);
    // console.log("scrolling", window.pageYOffset);

    this.morphNavbar = (window.innerWidth > 770 && ((window.pageYOffset / window.innerHeight * 100) > 50)) || (window.innerWidth < 770 && ((window.pageYOffset / window.innerHeight * 100) > 60));
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }
}
