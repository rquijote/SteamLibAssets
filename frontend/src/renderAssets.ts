import type {
  PaginatedAssets,
  AssetType,
  Asset,
  DownloadAssets,
} from "./types/Asset.js";
import { loadAssets } from "./index.js";
import downloadAsset from "./downloadAsset.js";

/**
 *
 * Render BG Image
 *
 */

export function renderBGDiv(allAssets: DownloadAssets) {
  const bg = document.getElementById("bg-header") as HTMLDivElement;
  bg.style.backgroundImage = `url(${allAssets.hero.fullImageUrl})`;

  let logo = document.getElementById("bg-logo") as HTMLImageElement;

  if (logo == null) {
    logo = document.createElement("img");
  }

  logo.src = allAssets.logo.thumbnailImageUrl;
  logo.id = "bg-logo";
  bg.appendChild(logo);
}

/**
 *
 * Render Assets Grid
 *
 */

export function renderAssetsGrid(fetchData: PaginatedAssets, type: AssetType) {
  renderImages(fetchData, type);
  renderPaginationBtns(fetchData, type);
}

function renderImages(fetchData: PaginatedAssets, type: AssetType) {
  const assetsGrid = document.getElementById("assets-grid");
  if (assetsGrid == null) {
    console.error("No assets-grid found.");
    return;
  }
  assetsGrid.replaceChildren();
  fetchData.assets.forEach((asset) => {
    const img = document.createElement("img");
    img.src = asset.thumbnailImageUrl;
    img.addEventListener("click", async () => {
      downloadAsset(asset.fullImageUrl, type);
    })

    // Author name, profile picture, steam profile hyperlinked.
    const name = document.createElement("p");
    name.textContent = asset.author.name;
    const pfp = document.createElement("img");
    pfp.src = asset.author.avatarUrl;
    const widthHeight = document.createElement("p");
    widthHeight.textContent = `${asset.width}x${asset.height}`;

    const steamProfileUrl = document.createElement("a");
    steamProfileUrl.href = asset.author.steamProfileUrl;
    steamProfileUrl.appendChild(name);

    const namecardDiv = document.createElement("div");
    namecardDiv.classList = "name-card";
    const nameDimensionsDiv = document.createElement("div");
    nameDimensionsDiv.classList = "name-dimensions";

    namecardDiv.appendChild(pfp);
    nameDimensionsDiv.appendChild(steamProfileUrl);
    nameDimensionsDiv.appendChild(widthHeight);
    namecardDiv.appendChild(nameDimensionsDiv);

    const assetDiv = document.createElement("div");
    assetDiv.classList = "asset-card"

    assetDiv.appendChild(img);
    assetDiv.appendChild(namecardDiv);
    assetsGrid.appendChild(assetDiv);
  });
}

function renderPaginationBtns(fetchData: PaginatedAssets, type: AssetType) {
  const paginationUl = document.createElement("ul");
  paginationUl.classList.add("pagination-wrapper");
  const pageNum = fetchData.page;
  const totalPages = fetchData.totalPages;
  const firstPage = 1;
  const minPagesForPagination = 5;
  const beforeFirstPage = 2; // first page after the first
  const beforeLastPage = totalPages - 1; // last page before the last
  const neighborOffset = 1; // Page around current. Used either before or after.

  if (totalPages < minPagesForPagination) {
    for (let p = 1; p <= totalPages; p++) {
      paginationUl.appendChild(createPageLi(p, pageNum));
    }
    appendPaginationUl(paginationUl, type);
    return;
  }

  // Always show the first page
  paginationUl.appendChild(createPageLi(firstPage, pageNum));

  // Ellipsis if needed
  if (pageNum > beforeFirstPage) paginationUl.appendChild(createEllipsisLi());

  // Gets biggest page, avoids surpassing the max page
  const middleStart = Math.max(beforeFirstPage, pageNum - neighborOffset);
  // Gets smallest page, avoids going down to page 1
  const middleEnd = Math.min(beforeLastPage, pageNum + neighborOffset);
  for (let p = middleStart; p <= middleEnd; p++) {
    paginationUl.appendChild(createPageLi(p, pageNum));
  }

  // Ellipsis if needed
  if (pageNum < beforeLastPage) paginationUl.appendChild(createEllipsisLi());

  // Always show the last page
  if (totalPages > firstPage)
    paginationUl.appendChild(createPageLi(totalPages, pageNum));

  appendPaginationUl(paginationUl, type);
}

function createPageLi(page: number, currentPage: number) {
  const li = document.createElement("li");
  li.textContent = page.toString();
  li.classList.add("pagination-btn");

  if (page === currentPage) {
    li.classList.add("active");
  }

  return li;
}

function createEllipsisLi() {
  const li = document.createElement("li");
  li.textContent = "...";
  li.classList.add("ellipsis");
  return li;
}

function appendPaginationUl(paginationUl: HTMLUListElement, type: AssetType) {
  const paginationDivs = document.getElementsByClassName("pagination-btns");

  for (let i = 0; i < paginationDivs.length; i++) {
    const div = paginationDivs[i]!;
    div.innerHTML = "";

    const clone = paginationUl.cloneNode(true);

    clone.addEventListener("click", (e) => {
      const li = (e.target as HTMLElement).closest("li");
      if (!li || li.classList.contains("active") || li.textContent === "...") {
        return;
      }

      const page = Number(li.textContent);
      loadAssets(type, page);
    });

    div.appendChild(clone);
  }
}