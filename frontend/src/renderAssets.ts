import type { Asset, AssetType } from "./types/Asset.js";

// Potentially create multiple prints for each asset type. For now printImages()
// since there's no identifiable differences between asset types yet. 

export function renderImages(grids: Asset[], type: AssetType) {
    const assetsGrid = document.getElementById("assets-grid");
    assetsGrid?.replaceChildren();
    grids.forEach(grid => {
        const img = document.createElement("img");
        img.src = grid.thumbnailImageUrl;
        assetsGrid!.appendChild(img);
    });
}
