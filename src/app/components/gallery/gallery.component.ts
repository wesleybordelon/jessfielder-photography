import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {

  photos: Photo[] = [
    { src: '../../public/photo1.jpg', title: 'Photo 1', description: 'This is a description of photo 1.', id: 1, subtitle: '' },
    { src: '../../public/photo2.jpg', title: 'Photo 2', description: 'This is a description of photo 2.', id: 2, subtitle: '' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

