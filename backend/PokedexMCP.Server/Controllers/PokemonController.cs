using Microsoft.AspNetCore.Mvc;
using PokedexMCP.Server.Models;
using PokedexMCP.Server.Services;

namespace PokedexMCP.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly IPokemonService _pokemonService;
        private readonly ILogger<PokemonController> _logger;

        public PokemonController(IPokemonService pokemonService, ILogger<PokemonController> logger)
        {
            _pokemonService = pokemonService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<PokemonListResponse>> GetPokemons(
            [FromQuery] int limit = 20,
            [FromQuery] int offset = 0)
        {
            try
            {
                var result = await _pokemonService.GetPokemonsAsync(limit, offset);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting pokemons");
                return StatusCode(500, "An error occurred while getting pokemons");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pokemon>> GetPokemonById(int id)
        {
            try
            {
                var pokemon = await _pokemonService.GetPokemonByIdAsync(id);
                return Ok(pokemon);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting pokemon with ID: {id}");
                return StatusCode(500, "An error occurred while getting pokemon details");
            }
        }

        [HttpGet("name/{name}")]
        public async Task<ActionResult<Pokemon>> GetPokemonByName(string name)
        {
            try
            {
                var pokemon = await _pokemonService.GetPokemonByNameAsync(name);
                return Ok(pokemon);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting pokemon with name: {name}");
                return StatusCode(500, "An error occurred while getting pokemon details");
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<Pokemon>>> SearchPokemons([FromQuery] string query)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(query))
                    return BadRequest("Search query is required");

                var pokemons = await _pokemonService.SearchPokemonsAsync(query);
                return Ok(pokemons);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching pokemons");
                return StatusCode(500, "An error occurred while searching pokemons");
            }
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<PokemonType>>> GetTypes()
        {
            try
            {
                var types = await _pokemonService.GetAllTypesAsync();
                return Ok(types);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting pokemon types");
                return StatusCode(500, "An error occurred while getting pokemon types");
            }
        }

        [HttpGet("type/{typeName}")]
        public async Task<ActionResult<PokemonType>> GetType(string typeName)
        {
            try
            {
                var type = await _pokemonService.GetPokemonTypeAsync(typeName);
                return Ok(type);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting pokemon type: {typeName}");
                return StatusCode(500, "An error occurred while getting pokemon type");
            }
        }
    }
}