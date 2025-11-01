import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon, PokemonType } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  standalone: false,
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon | null = null;
  loading: boolean = true;
  error: string = '';
  activeTab: string = 'stats';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadPokemonDetails();
  }

  loadPokemonDetails(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id');

    if (!pokemonId) {
      this.error = 'Pokémon ID not found';
      this.loading = false;
      return;
    }

    this.loadingService.show();
    this.loading = true;

    this.pokemonService.getPokemonById(+pokemonId).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        this.loading = false;
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error loading pokemon details:', error);
        this.error = 'Error loading Pokémon details. Please try again.';
        this.loading = false;
        this.loadingService.hide();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
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
  getPrimaryType(): string {
    return this.pokemon?.types[0]?.type?.name || 'normal';
  }

  getStatName(stat: string): string {
    const statNames: { [key: string]: string } = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      'speed': 'Speed'
    };
    return statNames[stat] || stat;
  }

  getPokemonId(): string {
    return this.pokemon?.id.toString().padStart(3, '0') || '000';
  }

  formatHeight(): string {
    return this.pokemon ? (this.pokemon.height / 10).toFixed(1) + ' m' : '0.0 m';
  }

  formatWeight(): string {
    return this.pokemon ? (this.pokemon.weight / 10).toFixed(1) + ' kg' : '0.0 kg';
  }

  getTotalStats(): number {
    if (!this.pokemon) return 0;
    return this.pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
  }
}