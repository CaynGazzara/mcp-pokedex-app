using System.Net;
using PokedexMCP.Server.Models;
using System.Text.Json;

namespace PokedexMCP.Server.Services
{
    public class PokeApiService : IPokemonService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<PokeApiService> _logger;

        public PokeApiService(HttpClient httpClient, ILogger<PokeApiService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _httpClient.BaseAddress = new Uri("https://pokeapi.co/api/v2/");
        }

        public async Task<PokemonListResponse> GetPokemonsAsync(int limit = 20, int offset = 0)
        {
            try
            {
                var response = await _httpClient.GetAsync($"pokemon?limit={limit}&offset={offset}");
                return await HandleResponse<PokemonListResponse>(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting pokemons list");
                throw;
            }
        }

        public async Task<Pokemon> GetPokemonByIdAsync(int id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"pokemon/{id}");
                return await HandleResponse<Pokemon>(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting pokemon with ID: {id}");
                throw;
            }
        }

        public async Task<Pokemon> GetPokemonByNameAsync(string name)
        {
            try
            {
                var response = await _httpClient.GetAsync($"pokemon/{name.ToLower()}");
                return await HandleResponse<Pokemon>(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting pokemon with name: {name}");
                throw;
            }
        }

        public async Task<PokemonType> GetPokemonTypeAsync(string typeName)
        {
            try
            {
                var response = await _httpClient.GetAsync($"type/{typeName.ToLower()}");
                return await HandleResponse<PokemonType>(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting pokemon type: {typeName}");
                throw;
            }
        }

        public async Task<List<Pokemon>> SearchPokemonsAsync(string query)
        {
            try
            {
                // Primeiro busca a lista de pokémons
                var listResponse = await GetPokemonsAsync(1000, 0);
                var matchingPokemons = listResponse.Results
                    .Where(p => p.Name.Contains(query, StringComparison.OrdinalIgnoreCase))
                    .Take(20)
                    .ToList();

                var pokemons = new List<Pokemon>();
                foreach (var pokemon in matchingPokemons)
                {
                    try
                    {
                        var fullPokemon = await GetPokemonByNameAsync(pokemon.Name);
                        pokemons.Add(fullPokemon);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, $"Error loading details for pokemon: {pokemon.Name}");
                    }
                }

                return pokemons;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching pokemons");
                throw;
            }
        }

        public async Task<List<PokemonType>> GetAllTypesAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("type");
                var typeList = await HandleResponse<PokemonListResponse>(response);

                var types = new List<PokemonType>();
                foreach (var typeResource in typeList.Results.Take(18)) // Primeiros 18 tipos principais
                {
                    try
                    {
                        var type = await GetPokemonTypeAsync(typeResource.Name);
                        types.Add(type);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, $"Error loading type: {typeResource.Name}");
                    }
                }

                return types;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all types");
                throw;
            }
        }

        private async Task<T> HandleResponse<T>(HttpResponseMessage response)
        {
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"PokeAPI returned status code: {response.StatusCode}");
            }

            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<T>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? throw new Exception("Failed to deserialize API response");
        }
    }
}