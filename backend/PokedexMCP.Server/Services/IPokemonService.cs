using PokedexMCP.Server.Models;

namespace PokedexMCP.Server.Services
{
    public interface IPokemonService
    {
        Task<PokemonListResponse> GetPokemonsAsync(int limit = 20, int offset = 0);
        Task<Pokemon> GetPokemonByIdAsync(int id);
        Task<Pokemon> GetPokemonByNameAsync(string name);
        Task<PokemonType> GetPokemonTypeAsync(string typeName);
        Task<List<Pokemon>> SearchPokemonsAsync(string query);
        Task<List<PokemonType>> GetAllTypesAsync();
    }
}