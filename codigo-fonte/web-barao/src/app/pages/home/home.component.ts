import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CarouselComponent } from '../../components/carousel/carousel.component';
import { DestaquesComponent } from '../../components/destaques/destaques.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    DestaquesComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
