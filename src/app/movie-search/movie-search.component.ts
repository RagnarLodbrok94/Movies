import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import { Movie } from '../shared/models/movie.model';
import { HttpService } from '../shared/services/http.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})

export class MovieSearchComponent implements OnInit, OnDestroy {
  showNav: boolean;
  error: boolean;
  errorMessage: string;
  title: string;
  totalResults: string;
  page: number;
  pages: number;
  pageRange: string = '0';
  itemsPerPage: number;
  showNavButtonPrev: boolean;
  showNavButtonNext: boolean;
  onDestroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  movies: Movie[] = [];
  liveResults: Movie[] = [];
  form: FormGroup;
  lsTitle: string;
  lsPage: string;

  constructor(
    private movieService: HttpService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) {}

  getPages( value, dividend ) {
    let result: number;
    result = ( value - value % dividend ) / dividend;
    if( value % dividend ) result = result + 1;
    return result;
  }

  renderPageRange( page: number, items: number ) {
    if( page > 1 ) {
      let
        min: number,
        max: number;
      min = items * ( page - 2 ) + 1;
      max = items * ( page - 1 );
      this.pageRange = min + '-' + max;
    } else {
      this.pageRange = '0';
    }
  }

  searchMovie( title: string, page: string = '1' ) {
    if( !!title ) {
      this.page = +page;
      this.pageRange = '0';
      this.showNavButtonPrev = false;
      this.showNavButtonNext = false;
      this.movieService.getMovies( title, page )
        .pipe( takeUntil( this.onDestroy ) )
        .subscribe( movies => {
          if( movies.Response === 'True' ) {
            this.showNav = true;
            this.error = false;
            this.movies = movies.Search;
            this.totalResults = movies.totalResults;
            this.itemsPerPage = movies.Search.length;

            this.pages = this.getPages( +this.totalResults, this.itemsPerPage );
            this.renderPageRange( this.page, this.itemsPerPage );
            if( this.page > 1 ) this.showNavButtonPrev = true;
            if( this.page < this.pages ) this.showNavButtonNext = true;
            this.localStorageService.setItem( 'title', title );
            this.localStorageService.setItem( 'page', page );
            this.liveResults = [];
          } else {
            this.showNav = false;
            this.error = true;
            this.movies = null;
            this.errorMessage = movies.Error;
          }
        });
    }
  }

  paginationNav() {
    this.movieService.getMovies( this.title, this.page.toString() )
      .pipe( takeUntil( this.onDestroy ) )
      .subscribe( movies => this.movies = movies.Search );
  }

  prev() {
    if( this.page > 1 ) {
      this.page--;
      this.paginationNav();
      this.renderPageRange( this.page, this.itemsPerPage );
      this.localStorageService.setItem( 'page', this.page.toString() );
    }

    if( this.page === 1 && this.showNavButtonPrev === true ) this.showNavButtonPrev = false;
    if( this.page < this.pages && this.showNavButtonNext === false ) this.showNavButtonNext = true;
  }

  next() {
    if( this.page < this.pages ) {
      this.page++;
      this.paginationNav();
      this.renderPageRange( this.page, this.itemsPerPage );
      this.localStorageService.setItem( 'page', this.page.toString() );
    }

    if( this.page > 1 && this.showNavButtonPrev === false ) this.showNavButtonPrev = true;
    if( this.page === this.pages && this.showNavButtonNext === true ) this.showNavButtonNext = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ''
    });

    this.form.get( 'title' ).valueChanges.pipe(
      map( data => this.title = data ),
      switchMap( () => {
        return this.movieService.getMovies( this.title, '1' );
      }),
      takeUntil( this.onDestroy )
    ).subscribe( movies => {
      if( this.title == '' ) this.liveResults = [];
      if( movies.Response === 'True' ) this.liveResults = movies.Search;
    });

    this.lsTitle =  this.localStorageService.getItem( 'title' );
    this.lsPage =  this.localStorageService.getItem( 'page' );
    if( this.lsTitle && this.lsPage ) {
      this.searchMovie( this.lsTitle, this.lsPage );
      this.showNav = true;
    }
  }

  ngOnDestroy() {
    this.onDestroy.next( null );
    this.onDestroy.complete();
    this.liveResults = [];
  }
}
