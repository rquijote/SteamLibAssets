using craftersmine.SteamGridDBNet;
using SteamLibAssets.Models;

namespace SteamLibAssets.Helpers
{
    public static class AssetMapper
    {
        private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png" };

        private static bool IsAllowed(string? url)
        {
            if (string.IsNullOrEmpty(url)) return false;
            var cleanUrl = url.Split('?')[0].ToLowerInvariant();
            return AllowedExtensions.Any(ext => cleanUrl.EndsWith(ext));
        }
        public static Asset MapAsset(SteamGridAsset asset)
        {
            return new Asset
            {
                FullImageUrl = asset.FullImageUrl,
                ThumbnailImageUrl = asset.ThumbnailImageUrl,
                Width = asset.Width,
                Height = asset.Height,
                Author = new Author
                {
                    Name = asset.Author.Name,
                    AvatarUrl = asset.Author.AvatarUrl,
                    SteamProfileUrl = asset.Author.SteamProfileUrl
                }
            };
        }
        public static List<Asset> MapAssets(IEnumerable<SteamGridAsset> assets)
        {
            return assets
                .Select(MapAsset)
                .Where(a => IsAllowed(a.FullImageUrl) && IsAllowed(a.ThumbnailImageUrl))
                .ToList();
        }


    }
}

