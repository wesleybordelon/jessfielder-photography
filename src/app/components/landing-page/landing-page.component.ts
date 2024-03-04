import { Component, OnDestroy, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { FooterComponent } from '../footer/footer.component';
import { Photo } from '../../models/photo.model';
import { isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  imports: [ CommonModule, NavigationBarComponent, HeroSectionComponent, GalleryComponent, FooterComponent ]
})

export class LandingPageComponent implements OnInit, OnDestroy {

  photos: Photo[] = [
    { id: 1, src: '/assets/images/photo1.jpg', title: '', description: '', subtitle: ''},
    { id: 2, src: '/assets/images/photo2.jpg', title: '', description: '', subtitle: '' }
  ];
  currentSlide: number = 0;
  private intervalId: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startCarousel();
    }    
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
       this.nextSlide();
     }, 5000);
  }

  previousSlide() {
    this.currentSlide = this.currentSlide - 1 < 0 ? this.photos.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.photos.length;
  }

}
