export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  imageUrl: string;
  typeNames: string[];
  base_experience?: number; // ← ADICIONE ESTA LINHA
}

export interface PokemonSprites {
  front_default?: string;
  front_shiny?: string;
  back_default?: string;
  back_shiny?: string;
}

export interface PokemonTypeSlot {
  slot: number;
  type: NamedApiResource;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
}

export interface PokemonAbility {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: NamedApiResource;
}

export interface NamedApiResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: NamedApiResource[];
}

export interface PokemonType {
  id: number;
  name: string;
  damage_relations: TypeRelations;
}

export interface TypeRelations {
  double_damage_from: NamedApiResource[];
  double_damage_to: NamedApiResource[];
  half_damage_from: NamedApiResource[];
  half_damage_to: NamedApiResource[];
  no_damage_from: NamedApiResource[];
  no_damage_to: NamedApiResource[];
}