using craftersmine.SteamGridDBNet;
using Microsoft.AspNetCore.Mvc;

namespace SteamLibAssets.Controllers
{
    [ApiController]
    [Route("api/steamgriddb")]
    public class SteamGridDbController : ControllerBase
    {
        [HttpGet("grids/{appId}")]
        public async Task<IActionResult> GetGrids(int appId)
        {
            var apiKey = Environment.GetEnvironmentVariable("STEAMGRIDDB_API_KEY");
            SteamGridDb sgdb = new SteamGridDb(apiKey);
            SteamGridDbGrid[]? grids = await sgdb.GetGridsByGameIdAsync(appId);
            return Ok(grids);
        }

        [HttpGet("heroes/{appId}")]
        public async Task<IActionResult> GetHeroes(int appId)
        {
            var apiKey = Environment.GetEnvironmentVariable("STEAMGRIDDB_API_KEY");
            SteamGridDb sgdb = new SteamGridDb(apiKey);
            SteamGridDbHero[]? heroes = await sgdb.GetHeroesByGameIdAsync(appId);
            return Ok(heroes);
        }

        [HttpGet("logos/{appId}")]
        public async Task<IActionResult> GetLogos(int appId)
        {
            var apiKey = Environment.GetEnvironmentVariable("STEAMGRIDDB_API_KEY");
            SteamGridDb sgdb = new SteamGridDb(apiKey);
            SteamGridDbLogo[]? logos = await sgdb.GetLogosByGameIdAsync(appId);
            return Ok(logos);
        }

        [HttpGet("icons/{appId}")]
        public async Task<IActionResult> GetIcons(int appId)
        {
            var apiKey = Environment.GetEnvironmentVariable("STEAMGRIDDB_API_KEY");
            SteamGridDb sgdb = new SteamGridDb(apiKey);
            SteamGridDbIcon[]? icons = await sgdb.GetIconsByGameIdAsync(appId);
            return Ok(icons);
        }
    }
}
