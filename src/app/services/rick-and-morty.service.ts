import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface RickAndMortyCharacter {
  id: number;
  name: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class RickAndMortyService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacterById(id: number): Observable<RickAndMortyCharacter> {
    return this.http.get<RickAndMortyCharacter>(`${this.baseUrl}/character/${id}`);
  }

  getRandomCharacter(): Observable<RickAndMortyCharacter> {
    // La API tiene actualmente 826 personajes aprox; pedimos 1 aleatorio.
    const maxId = 826;
    const randomId = Math.max(1, Math.floor(Math.random() * maxId));
    return this.getCharacterById(randomId);
  }

  searchCharactersByName(name: string): Observable<RickAndMortyCharacter[]> {
    return this.http
      .get<{ results: RickAndMortyCharacter[] }>(`${this.baseUrl}/character/?name=${encodeURIComponent(name)}`)
      .pipe(map((r) => r.results ?? []));
  }
}
