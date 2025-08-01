import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { PropertyDetailComponent } from './components/property/property-detail/property-detail.component';
import { BrowseComponent } from './components/property/browse/browse.component';
import { VideoScrollComponent } from './components/video-scroll/video-scroll.component';


const routes: Routes = [
  {
    path: '',
    component: PropertyListComponent
  },
  {
    path: 'property/:id/:slug',
    component: PropertyDetailComponent
  },
  {
    path: 'browse',
    component: BrowseComponent
  },
  {
    path: 'test',
    component: VideoScrollComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
