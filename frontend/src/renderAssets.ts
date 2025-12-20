import type { PaginatedAssets, AssetType } from "./types/Asset.js";

// Potentially create multiple prints for each asset type. For now printImages()
// since there's no identifiable differences between asset types yet. 

export function renderImages(fetchData: PaginatedAssets, type: AssetType) {
    const assetsGrid = document.getElementById("assets-grid");
    assetsGrid?.replaceChildren();
    fetchData.assets.forEach(asset => {
        const img = document.createElement("img");
        img.src = asset.thumbnailImageUrl;
        assetsGrid!.appendChild(img);
    });
}
