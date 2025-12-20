using Microsoft.AspNetCore.Mvc;
using SteamLibAssets.Helpers;
using SteamLibAssets.Models;
using SteamLibAssets.Services;
using craftersmine.SteamGridDBNet;

namespace SteamLibAssets.Controllers
{
    [ApiController]
    [Route("api/assets")]
    public class SteamGridDbController : ControllerBase
    {
        private readonly SteamGridDbService _sgdbService = new SteamGridDbService();

        [HttpGet("grids/{appId}")]
        public async Task<IActionResult> GetGrids(int appId)
        {
            var grids = await _sgdbService.GetGridsAsync(appId);

            var assets = AssetMapper.MapAssets(
                grids,
                x => x.FullImageUrl,
                x => x.ThumbnailImageUrl,
                x => x.Width,
                x => x.Height,
                x => x.Author
            );

            return Ok(assets);
        }

        [HttpGet("heroes/{appId}")]
        public async Task<IActionResult> GetHeroes(int appId)
        {
            var heroes = await _sgdbService.GetHeroesAsync(appId);
            var assets = AssetMapper.MapAssets(
                heroes,
                x => x.FullImageUrl,
                x => x.ThumbnailImageUrl,
                x => x.Width,
                x => x.Height,
                x => x.Author
            );
            return Ok(assets);
        }

        [HttpGet("logos/{appId}")]
        public async Task<IActionResult> GetLogos(int appId)
        {
            var logos = await _sgdbService.GetLogosAsync(appId);
            var assets = AssetMapper.MapAssets(
                logos,
                x => x.FullImageUrl,
                x => x.ThumbnailImageUrl,
                x => x.Width,
                x => x.Height,
                x => x.Author
            );
            return Ok(assets);
        }

        [HttpGet("icons/{appId}")]
        public async Task<IActionResult> GetIcons(int appId)
        {
            var icons = await _sgdbService.GetIconsAsync(appId);
            var assets = AssetMapper.MapAssets(
                icons,
                x => x.FullImageUrl,
                x => x.ThumbnailImageUrl,
                x => x.Width,
                x => x.Height,
                x => x.Author
            );
            return Ok(assets);
        }
    }
}

