namespace SteamLibAssets.Models
{
    public class SteamGridAsset
    {
        public required string FullImageUrl { get; init; }
        public required string ThumbnailImageUrl { get; init; }
        public required int Width { get; init; }
        public required int Height { get; init; }
        public required Author Author { get; init; }
    }
}
