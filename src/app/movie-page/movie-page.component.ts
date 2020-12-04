import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from './../shared/services/http.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {
  id: string;
  movie: any;

  constructor(
    private movieService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  togglePlay() {
    let video = document.querySelector( '.trailer-video' );
    video.classList.toggle( 'active' );
  }

  ngOnInit() {
    this.movie = this.movieService.getMovie( this.id );
  }
}
