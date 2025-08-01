import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ApiService } from '../../../services/api.service';
import { AMENITY_ICONS } from '../../../app.constants';
import { GptService } from '../../../services/gpt-service.service';

@Component({
  selector: 'app-property-detail',
  standalone: false,
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit {

  isCopied: boolean = false;
  currentImageIndex: number = 0;
  emailInvalid: boolean = false;
  user: any = {};
  submitting: boolean = false;
  showMap: boolean = false;
  showMore: boolean = false;

  property: any = {
    name: '',
    description: 'Small summer garden house with large terrace surrounded by greenery. It\'s kind of like a hotel room by the forest.The special thing about it is that a gable wall is completely glazed.It is located in the garden of Villa Sunnyside, above Pillnitz Castle.Not properly heatable, therefore only bookable in summer/ autumn!',
    location: 'Pilintz',
    district: 'Thika',
    county: 'Kiambu',
    type: 'Tiny Home',
    price: 25000,
    availability: true,
    isRental: true,
    rooms: 1,
    iframeUrl: 'https://wess58.github.io/vr-env-2/',
    imageUrl: ['../../../../assets/images/img3.webp'],
    amenities: AMENITY_ICONS
  };

  constructor(
    public sanitizer: DomSanitizer,
    private apiService: ApiService,
    private gptService: GptService
  ) { }


  ngOnInit(): void {

    window.scrollTo({ top: 0, behavior: 'smooth' })

    this.property.imageUrl = Array(5).fill(this.property.imageUrl);
    this.property.breadcrumbs = ['All', (this.property.county), this.property.district, this.property.location];

    if (!localStorage.getItem('fetched')) {
      // this.onPropertyClick(this.property.county);
    }

    this.showMap = false;
    setTimeout(() => this.showMap = true);
  }



  copyLink(): void {
    navigator.clipboard.writeText(window.location as any);
    this.isCopied = true;
  }


  validateEmail(): void {
    // console.log(!(/\S+@\S+\.\S+/).test(this.user.email.trim()));
    this.emailInvalid = this.user.email && !(/\S+@\S+\.\S+/).test(this.user.email);
  }

  onPropertyClick(location: string) {
    this.gptService.getAreaSummary(location).subscribe(
      {
        next: (res) => {
          console.log(res);
          const reply = res.choices?.[0]?.message?.content;
          this.property.extraInfo = reply;
          localStorage.setItem('fetched', 'true');
        }
      });
  }


  submitForm(): void {
    this.submitting = true;
  }
}


