import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property/property-detail/property-detail.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FigureFormatterPipe } from './pipes/figure-formartter.pipe';
import { NgmodelDebounceDirective } from './directives/ngmodel-debounce.directive';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SanitizeUrlPipe } from './pipes/sanitize-url.pipe';
import { AppTooltipDirective } from './directives/app-tooltip.directive';
import { SearchWidgetComponent } from './components/search-widget/search-widget.component';
import { VrIframeComponent } from './components/shared/vr-iframe/vr-iframe.component';
import { BrowseComponent } from './components/property/browse/browse.component';
import { PropertyCardComponent } from './components/shared/property-card/property-card.component';
import { MapWidgetComponent } from './components/map-widget/map-widget.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VideoScrollComponent } from './components/video-scroll/video-scroll.component';


@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent,
    PropertyDetailComponent,
    NavbarComponent,
    FooterComponent,
    FigureFormatterPipe,
    NgmodelDebounceDirective,
    SanitizeUrlPipe,
    AppTooltipDirective,
    SearchWidgetComponent,
    VrIframeComponent,
    BrowseComponent,
    PropertyCardComponent,
    MapWidgetComponent,
    VideoScrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    NgxPaginationModule
  ],
  providers: [
    // provideAnimations()
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
