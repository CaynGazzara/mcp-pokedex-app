using System.Text.Json.Serialization;

namespace PokedexMCP.Server.Models
{
    public class Pokemon
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("sprites")]
        public PokemonSprites Sprites { get; set; } = new();

        [JsonPropertyName("types")]
        public List<PokemonTypeSlot> Types { get; set; } = new();

        [JsonPropertyName("height")]
        public int Height { get; set; }

        [JsonPropertyName("weight")]
        public int Weight { get; set; }

        [JsonPropertyName("stats")]
        public List<PokemonStat> Stats { get; set; } = new();

        [JsonPropertyName("abilities")]
        public List<PokemonAbility> Abilities { get; set; } = new();

        [JsonPropertyName("moves")]
        public List<PokemonMove> Moves { get; set; } = new();

        public string ImageUrl => Sprites.FrontDefault ?? string.Empty;
        public List<string> TypeNames => Types.Select(t => t.Type.Name).ToList();
    }

    public class PokemonSprites
    {
        [JsonPropertyName("front_default")]
        public string? FrontDefault { get; set; }

        [JsonPropertyName("front_shiny")]
        public string? FrontShiny { get; set; }

        [JsonPropertyName("back_default")]
        public string? BackDefault { get; set; }

        [JsonPropertyName("back_shiny")]
        public string? BackShiny { get; set; }
    }

    public class PokemonTypeSlot
    {
        [JsonPropertyName("slot")]
        public int Slot { get; set; }

        [JsonPropertyName("type")]
        public NamedApiResource Type { get; set; } = new();
    }

    public class PokemonStat
    {
        [JsonPropertyName("base_stat")]
        public int BaseStat { get; set; }

        [JsonPropertyName("effort")]
        public int Effort { get; set; }

        [JsonPropertyName("stat")]
        public NamedApiResource Stat { get; set; } = new();
    }

    public class PokemonAbility
    {
        [JsonPropertyName("ability")]
        public NamedApiResource Ability { get; set; } = new();

        [JsonPropertyName("is_hidden")]
        public bool IsHidden { get; set; }

        [JsonPropertyName("slot")]
        public int Slot { get; set; }
    }

    public class PokemonMove
    {
        [JsonPropertyName("move")]
        public NamedApiResource Move { get; set; } = new();
    }

    public class NamedApiResource
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("url")]
        public string Url { get; set; } = string.Empty;
    }

    public class PokemonListResponse
    {
        [JsonPropertyName("count")]
        public int Count { get; set; }

        [JsonPropertyName("next")]
        public string? Next { get; set; }

        [JsonPropertyName("previous")]
        public string? Previous { get; set; }

        [JsonPropertyName("results")]
        public List<NamedApiResource> Results { get; set; } = new();
    }

    public class PokemonType
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("damage_relations")]
        public TypeRelations DamageRelations { get; set; } = new();
    }

    public class TypeRelations
    {
        [JsonPropertyName("double_damage_from")]
        public List<NamedApiResource> DoubleDamageFrom { get; set; } = new();

        [JsonPropertyName("double_damage_to")]
        public List<NamedApiResource> DoubleDamageTo { get; set; } = new();

        [JsonPropertyName("half_damage_from")]
        public List<NamedApiResource> HalfDamageFrom { get; set; } = new();

        [JsonPropertyName("half_damage_to")]
        public List<NamedApiResource> HalfDamageTo { get; set; } = new();

        [JsonPropertyName("no_damage_from")]
        public List<NamedApiResource> NoDamageFrom { get; set; } = new();

        [JsonPropertyName("no_damage_to")]
        public List<NamedApiResource> NoDamageTo { get; set; } = new();
    }
}