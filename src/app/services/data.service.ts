import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Videogame } from '../models/videogame.model';
import movies from '../../assets/movies.json';
import videogames from '../../assets/videogames.json';

@Injectable({ providedIn: 'root' })
export class DataService {
  getMovies(): Movie[] {
    return movies as Movie[];
  }
  getVideogames(): Videogame[] {
    return videogames as Videogame[];
  }
}
