import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-card',
  standalone: false,
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {


  @Input() property: any = {};


  slugify(str: string): string {
    return str.replace(/[()]/g, '').replace(/\s/g, '-').toLowerCase();
  }
}
