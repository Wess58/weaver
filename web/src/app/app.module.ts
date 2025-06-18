import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
    SearchWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  providers: [
    // provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
