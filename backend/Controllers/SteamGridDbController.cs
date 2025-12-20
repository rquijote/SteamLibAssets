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

        private IActionResult PaginateAssets(List<Asset> assets, int page, int pageSize)
        {
            var totalItems = assets.Count;
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var pagedAssets = assets
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = pagedAssets
            });
        }

        [HttpGet("grids/{appId}")]
        public async Task<IActionResult> GetGrids(int appId, int page = 1, int pageSize = 10)
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

            return PaginateAssets(assets, page, pageSize);
        }

        [HttpGet("heroes/{appId}")]
        public async Task<IActionResult> GetHeroes(int appId, int page = 1, int pageSize = 10)
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

            return PaginateAssets(assets, page, pageSize);
        }

        [HttpGet("logos/{appId}")]
        public async Task<IActionResult> GetLogos(int appId, int page = 1, int pageSize = 10)
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

            return PaginateAssets(assets, page, pageSize);
        }

        [HttpGet("icons/{appId}")]
        public async Task<IActionResult> GetIcons(int appId, int page = 1, int pageSize = 10)
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

            return PaginateAssets(assets, page, pageSize);
        }
    }
}

