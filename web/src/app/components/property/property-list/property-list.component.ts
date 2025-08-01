import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { PLACEHOLDER_PROPERTIES } from '../../../app.constants';
import gsap from 'gsap';

@Component({
  selector: 'app-property-list',
  standalone: false,
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0.5 }),
        animate(500, style({ opacity: 1 })),
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


  properties: any[] = PLACEHOLDER_PROPERTIES;
  heroText = 'See It. Feel It. Live It.'
  virtualEnvProperties: any = [
    {
      title: 'The Aurelia Residences in Runda',
      price: 40000,
      iframeUrl: 'https://wess58.github.io/vr-env/'
    },
    {
      title: 'Velmor Heights in Ridgeways',
      price: 50000,
      iframeUrl: 'https://wess58.github.io/vr-env-2/'
    },
    {
      title: 'Solencia Grove in Thindigua',
      price: 60000,
      iframeUrl: 'https://wess58.github.io/vr-env/'
    }
  ]


  @ViewChild('animatedText') textEl!: ElementRef;


  ngOnInit(): void {

    this.properties = [...this.properties, ...this.properties, ...this.properties];
    window.scrollTo({ top: 0, behavior: 'smooth' })

  }

  ngAfterViewInit(): void {

    // Split text into spans
    const splitWords = this.heroText.split(' ').map(word => {
      const letters = word.split('').map(letter => `<span class="letter">${letter}</span>`).join('');
      return `<span class="word">${letters}&nbsp;</span>`;
    });

    this.textEl.nativeElement.innerHTML = splitWords.join('');

    // Animate each letter
    this.animateTextFadeSplit(this.textEl.nativeElement.querySelectorAll('.letter'));
  }





  animateTextFadeSplit(selector: HTMLElement, triggerOptions: any = {}): void {
    gsap.fromTo(
      selector,
      { y: 20, opacity: 0, scale: 0.5,
       
       },
      {
        y: 0, opacity: 1, scale: 1, duration: 2, ease: 'back.out(1.7)',
        stagger: {
          amount: 3, from: 'start'
        },
        scrollTrigger: {
          scrub: true,
          start: "50% 60%"
        }
      }
    );
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
