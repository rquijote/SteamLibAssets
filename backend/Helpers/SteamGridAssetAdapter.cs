using craftersmine.SteamGridDBNet;
using SteamLibAssets.Models;

namespace SteamLibAssets.Helpers
{
    public static class SteamGridDbAdapters
    {
        private static SteamGridAsset BuildSteamAsset(
            string full,
            string thumb,
            int width,
            int height,
            SteamAuthor author)
        {
            return new SteamGridAsset
            {
                FullImageUrl = full ?? "",
                ThumbnailImageUrl = thumb ?? "",
                Width = width,
                Height = height,
                Author = new Author
                {
                    Name = author.Name,
                    AvatarUrl = author.AvatarUrl,
                    SteamProfileUrl = author.SteamProfileUrl,
                }
            };
        }

        // Grid adapter
        public static SteamGridAsset ToAssetView(this SteamGridDbGrid g) =>
            BuildSteamAsset(g.FullImageUrl, g.ThumbnailImageUrl, g.Width, g.Height, g.Author);

        // Hero adapter
        public static SteamGridAsset ToAssetView(this SteamGridDbHero h) =>
            BuildSteamAsset(h.FullImageUrl, h.ThumbnailImageUrl, h.Width, h.Height, h.Author);

        // Icon adapter
        public static SteamGridAsset ToAssetView(this SteamGridDbIcon i) =>
            BuildSteamAsset(i.FullImageUrl, i.ThumbnailImageUrl, i.Width, i.Height, i.Author);

        // Logo adapter
        public static SteamGridAsset ToAssetView(this SteamGridDbLogo l) =>
            BuildSteamAsset(l.FullImageUrl, l.ThumbnailImageUrl, l.Width, l.Height, l.Author);
    }
}

