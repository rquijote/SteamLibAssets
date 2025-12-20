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

        public static List<Asset> MapAssets<T>(IEnumerable<T> items,
            Func<T, string> getFullUrl,
            Func<T, string> getThumbUrl,
            Func<T, int> getWidth,
            Func<T, int> getHeight,
            Func<T, SteamAuthor?> getAuthor)
        {
            return items
                .Select(x => new Asset
                {
                    FullImageUrl = getFullUrl(x) ?? "",
                    ThumbnailImageUrl = getThumbUrl(x) ?? "",
                    Width = getWidth(x),
                    Height = getHeight(x),
                    Author = getAuthor(x) == null
                        ? new Author { Name = "", AvatarUrl = "", SteamProfileUrl = "" }
                        : new Author
                        {
                            Name = getAuthor(x)?.Name ?? "",
                            AvatarUrl = getAuthor(x)?.AvatarUrl ?? "",
                            SteamProfileUrl = getAuthor(x)?.SteamProfileUrl ?? ""
                        }
                })
                .Where(a => IsAllowed(a.FullImageUrl) && IsAllowed(a.ThumbnailImageUrl))
                .ToList();
        }
    }
}

