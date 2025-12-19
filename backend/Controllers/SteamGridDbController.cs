using craftersmine.SteamGridDBNet;
using Microsoft.AspNetCore.Mvc;

namespace SteamLibAssets.Controllers
{
    [ApiController]
    [Route("api/assets")]
    public class SteamGridDbController : ControllerBase
    {
        private SteamGridDb CreateClient()
        {
            var apiKey = Environment.GetEnvironmentVariable("STEAMGRIDDB_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
                throw new InvalidOperationException("SteamGridDB API key not configured");
            return new SteamGridDb(apiKey);
        }

        [HttpGet("grids/{appId}")]
        public async Task<IActionResult> GetGrids(int appId)
        {
            var sgdb = CreateClient();
            var grids = await sgdb.GetGridsByGameIdAsync(appId);
            return Ok(grids);
        }

        [HttpGet("heroes/{appId}")]
        public async Task<IActionResult> GetHeroes(int appId)
        {
            var sgdb = CreateClient();
            var heroes = await sgdb.GetHeroesByGameIdAsync(appId);
            return Ok(heroes);
        }

        [HttpGet("logos/{appId}")]
        public async Task<IActionResult> GetLogos(int appId)
        {
            var sgdb = CreateClient();
            var logos = await sgdb.GetLogosByGameIdAsync(appId);
            return Ok(logos);
        }

        [HttpGet("icons/{appId}")]
        public async Task<IActionResult> GetIcons(int appId)
        {
            var sgdb = CreateClient();
            var icons = await sgdb.GetIconsByGameIdAsync(appId);
            return Ok(icons);
        }
    }

}
