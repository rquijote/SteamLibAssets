using craftersmine.SteamGridDBNet;
using SteamLibAssets.Models;

namespace SteamLibAssets.Services
{
    public class SteamGridDbService
    {
        private readonly SteamGridDb _client;

        public SteamGridDbService()
        {
            var apiKey = Environment.GetEnvironmentVariable("STEAMGRIDDB_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
                throw new InvalidOperationException("SteamGridDB API key not configured");

            _client = new SteamGridDb(apiKey);
        }

        public Task<SteamGridDbGrid[]> GetGridsAsync(int appId) => _client.GetGridsByGameIdAsync(appId);
        public Task<SteamGridDbHero[]> GetHeroesAsync(int appId) => _client.GetHeroesByGameIdAsync(appId);
        public Task<SteamGridDbLogo[]> GetLogosAsync(int appId) => _client.GetLogosByGameIdAsync(appId);
        public Task<SteamGridDbIcon[]> GetIconsAsync(int appId) => _client.GetIconsByGameIdAsync(appId);
        public Task<SteamGridDbGame[]> SearchGamesAsync(string searchTerm) => _client.SearchForGamesAsync(searchTerm);
    }
}
