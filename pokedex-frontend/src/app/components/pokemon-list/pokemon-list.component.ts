import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon, PokemonListResponse } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  standalone: false,
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  allPokemons: Pokemon[] = [];
  searchResult: PokemonListResponse | null = null;
  currentPage: number = 1;
  currentQuery: string = '';
  itemsPerPage: number = 20;
  hasSearched: boolean = false;
  loading: boolean = true;
  totalPokemons: number = 0;

  constructor(
    private pokemonService: PokemonService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPokemons();
  }

  onSearch(query: string) {
    this.currentQuery = query;
    this.currentPage = 1;
    this.hasSearched = true;
    this.performSearch(query);
  }

  onClearSearch() {
    this.currentQuery = '';
    this.currentPage = 1;
    this.hasSearched = false;
    this.loadPokemons();
  }

  getTypeColor(type: string | undefined): string {
    if (!type) return '#68A090'; // Valor padrão se type for undefined

    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return typeColors[type] || '#68A090';
  }

  // Adicione este método para obter o tipo principal de forma segura
  getPrimaryType(pokemon: Pokemon): string {
    return pokemon?.types[0]?.type?.name || 'normal';
  }

  loadPokemons(page: number = 1) {
    this.loading = true;
    this.loadingService.show();
    const offset = (page - 1) * this.itemsPerPage;

    this.pokemonService.getPokemons(this.itemsPerPage, offset).subscribe({
      next: (result) => {
        this.searchResult = result;
        this.totalPokemons = result.count;

        // Load details for each pokemon
        this.loadPokemonDetails(result.results);
      },
      error: (error) => {
        console.error('Error loading pokemons:', error);
        this.pokemons = [];
        this.loading = false;
        this.loadingService.hide();
      }
    });
  }

  private loadPokemonDetails(pokemonResources: any[]) {
    const pokemonDetails: Pokemon[] = [];
    let loadedCount = 0;

    pokemonResources.forEach(pokemonResource => {
      this.pokemonService.getPokemonByName(pokemonResource.name).subscribe({
        next: (pokemon) => {
          pokemonDetails.push(pokemon);
          loadedCount++;

          if (loadedCount === pokemonResources.length) {
            this.pokemons = pokemonDetails.sort((a, b) => a.id - b.id);
            this.loading = false;
            this.loadingService.hide();
          }
        },
        error: (error) => {
          console.error(`Error loading pokemon ${pokemonResource.name}:`, error);
          loadedCount++;

          if (loadedCount === pokemonResources.length) {
            this.pokemons = pokemonDetails.sort((a, b) => a.id - b.id);
            this.loading = false;
            this.loadingService.hide();
          }
        }
      });
    });
  }

  private performSearch(query: string) {
    this.loading = true;
    this.loadingService.show();

    this.pokemonService.searchPokemons(query).subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
        this.loading = false;
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error searching pokemons:', error);
        this.pokemons = [];
        this.loading = false;
        this.loadingService.hide();
      }
    });
  }

  nextPage() {
    if (this.searchResult?.next) {
      this.currentPage++;
      this.loadPokemons(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons(this.currentPage);
    }
  }

  viewPokemonDetails(pokemonId: number) {
    this.router.navigate(['/pokemon', pokemonId]);
  }

  getPokemonId(pokemon: Pokemon): string {
    return pokemon.id.toString().padStart(3, '0');
  }

  getTotalPages(): number {
    return Math.ceil(this.totalPokemons / this.itemsPerPage);
  }
}