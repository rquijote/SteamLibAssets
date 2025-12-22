using Microsoft.AspNetCore.Mvc;
using SteamLibAssets.Helpers;
using SteamLibAssets.Models;
using SteamLibAssets.Services;
using craftersmine.SteamGridDBNet;
using System;

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
                Assets = pagedAssets
            });
        }

        [HttpGet("all/{appId}")]
        public async Task<IActionResult> Get(int appId)
        {
            var grids = await _sgdbService.GetGridsAsync(appId);
            var heroes = await _sgdbService.GetLogosAsync(appId);
            var logos = await _sgdbService.GetLogosAsync(appId);
            var icons = await _sgdbService.GetIconsAsync(appId);

            return Ok(new
            {
                Grid = grids[0],
                Hero = heroes[0],
                Logo = logos[0],
                Icon = icons[0]
            }); // Create new AllAssets function or return a variable for it here.
        }

        [HttpGet("grids/{appId}/{page}")]
        public async Task<IActionResult> GetGrids(int appId, int page = 1, int pageSize = 12)
        {
            var grids = await _sgdbService.GetGridsAsync(appId);
            var assets = AssetMapper.MapAssets(
                grids.Select(grid => grid.ToAssetView()));

            return PaginateAssets(assets, page, pageSize);
        }

        [HttpGet("heroes/{appId}/{page}")]
        public async Task<IActionResult> GetHeroes(int appId, int page = 1, int pageSize = 12)
        {
            var heroes = await _sgdbService.GetHeroesAsync(appId);
            var assets = AssetMapper.MapAssets(
                heroes.Select(hero => hero.ToAssetView()));

            return PaginateAssets(assets, page, pageSize);
        }

        [HttpGet("logos/{appId}/{page}")]
        public async Task<IActionResult> GetLogos(int appId, int page = 1, int pageSize = 12)
        {
            var logos = await _sgdbService.GetLogosAsync(appId);
            var assets = AssetMapper.MapAssets(
                logos.Select(logo => logo.ToAssetView()));

            return PaginateAssets(assets, page, pageSize);
        }

        [HttpGet("icons/{appId}/{page}")]
        public async Task<IActionResult> GetIcons(int appId, int page = 1, int pageSize = 12)
        {
            var icons = await _sgdbService.GetIconsAsync(appId);
            var assets = AssetMapper.MapAssets(
                icons.Select(icon => icon.ToAssetView()));

            return PaginateAssets(assets, page, pageSize);
        }
    }
}

