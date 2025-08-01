import { Component, Input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-vr-iframe',
  standalone: false,
  templateUrl: './vr-iframe.component.html',
  styleUrl: './vr-iframe.component.scss'
})
export class VrIframeComponent {

  constructor(
    public sanitizer: DomSanitizer,
  ) { }


  @Input('iframeLink') iframeLink = '';
  @Input() height: number = 700; //  trigger type

  hoverIframe = false;

}
