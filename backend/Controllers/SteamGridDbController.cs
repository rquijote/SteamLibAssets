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
    }
}
