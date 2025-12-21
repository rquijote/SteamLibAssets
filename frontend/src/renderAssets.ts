import type { PaginatedAssets, AssetType } from "./types/Asset.js";

export default function renderAssetsGrid(fetchData: PaginatedAssets, type: AssetType) {
    renderImages(fetchData, type);
    renderPaginationBtns(fetchData, type);
}

function renderImages(fetchData: PaginatedAssets, type: AssetType) {
    const assetsGrid = document.getElementById("assets-grid");
    assetsGrid?.replaceChildren();
    fetchData.assets.forEach(asset => {
        const img = document.createElement("img");
        img.src = asset.thumbnailImageUrl;
        assetsGrid!.appendChild(img);
    });
}

function renderPaginationBtns(fetchData: PaginatedAssets, type: AssetType) {
    /**
     * At page 1: < 1 2 3 4 5 ... 10 > 
     * At page 5: < 1 ... 4 5 6 ... 10 > 
     * At page 10: < 1 ... 6 7 8 9 10 > 
     * 
     * At max 4 pages: < 1 2 3 4 > 
     * 
     * page: 1, pageSize: 12, totalItems: 44, totalPages: 4
     * 
     * - BASIC PAGINATION RENDER LOGIC IF TRUNCATION NEEDED -   
     * Create <ul> as a wrapper for li 
     * int firstPage = 1;
     * int linksBeforeTruncate = 3;
     * if (pageNum - firstPage >= linksBeforeTruncate): // If the page num is larger 
     *  // than 3 links from start. So we're on pageNum 5. And we're also not 
     *  3 away from the totalpages. Truncate start and end.
     *  append firstPage li to ul
     *  append "..." to ul
     *  linksBeforeTruncate = 3 
     *  pagination for int loop here - is expected to do 4,5,6
     *  append "..." to ul
     *  append totalPages. 
     *  Append the ul to all <div class="pagination-btns"></div>
     * 
     *  Expected Outcome: At page 5: < 1 ... 4 5 6 ... 10 > 
     * 
     * else:
     *  USE PAGINATION RENDER WHEN 5 AWAY FROM START OR END
     * 
     * - PAGINATION RENDER WHEN 5 AWAY FROM START OR END -
     * int maxLinksAtStart = 4  
     * bool closerToStart, if page - maxLinksAtStart < firstPage true. else false.
     * let maxLinksBeforeTrunc = 5
     * for int pageNum = page *1* until maxLinksBeforeTrunc:
     *  create <li> that has a click of loadAssets(type, pageNum)
     *  Append all li to ul
     * :End for loop:
     *  
     * return if pageNum < maxLinksBeforeTrunc;
     * else do below: 
     * - TRUNCATION RENDER LOGIC WHEN 5 REACHED - 
     * Append "..." li to ul
     * Append totalPages li to ul.
     * Append the ul to all <div class="pagination-btns"></div>
     * 
     * Expected Outcome: At page 1: < 1 2 3 4 5 ... 10 > 
     * 
     */
}