import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PokemonListResponse, PokemonType } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://localhost:7185/api/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(limit: number = 20, offset: number = 0): Observable<PokemonListResponse> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<PokemonListResponse>(this.apiUrl, { params });
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/name/${name}`);
  }

  searchPokemons(query: string): Observable<Pokemon[]> {
    let params = new HttpParams().set('query', query);
    return this.http.get<Pokemon[]>(`${this.apiUrl}/search`, { params });
  }

  getTypes(): Observable<PokemonType[]> {
    return this.http.get<PokemonType[]>(`${this.apiUrl}/types`);
  }

  getType(typeName: string): Observable<PokemonType> {
    return this.http.get<PokemonType>(`${this.apiUrl}/type/${typeName}`);
  }
}