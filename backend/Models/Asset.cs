namespace SteamLibAssets.Models
{
    public class Asset
    {
        public string FullImageUrl { get; set; } = "";
        public string ThumbnailImageUrl { get; set; } = "";
        public int Width { get; set; }
        public int Height { get; set; }
        public Author Author { get; set; } = new Author { Name = "", AvatarUrl = "", SteamProfileUrl = "" };
    }
}