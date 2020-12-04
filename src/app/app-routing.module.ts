import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';

const routes: Routes = [
  { path: '', component: MovieSearchComponent },
  { path: 'movie-page/:id', component: MoviePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
