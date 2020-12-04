import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.scss']
})
export class MovieSliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    autoplay: false,
    items: 1,
    nav: true,
    dots: false,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
