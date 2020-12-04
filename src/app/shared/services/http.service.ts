import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable( { providedIn: 'root' } )

export class HttpService {
  constructor( private http: HttpClient ) {}

  getMovies( title: string, page: string ): Observable<any> {
    return this.http.get( `${ environment.omdbUrl }/?apikey=${ environment.apiKey }&s=${ title }&page=${ page }` )
  }

  getMovie( title: string ): Observable<any> {
    return this.http.get( `${ environment.omdbUrl }/?apikey=${ environment.apiKey }&i=${ title }` )
  }
}
