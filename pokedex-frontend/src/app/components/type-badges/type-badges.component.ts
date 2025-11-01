import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-type-badges',
  templateUrl: './type-badges.component.html',
  styleUrls: ['./type-badges.component.css']
})
export class TypeBadgesComponent {
  @Input() types: string[] = [];
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  getTypeColor(type: string): string {
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
}