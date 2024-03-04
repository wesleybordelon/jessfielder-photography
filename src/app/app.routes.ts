import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BookingComponent } from './components/booking/booking.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SpecialsComponent } from './components/specials/specials.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'about', component: AboutComponent },
    { path: 'specials', component: SpecialsComponent },
    { path: 'booking', component: BookingComponent }
  ];
