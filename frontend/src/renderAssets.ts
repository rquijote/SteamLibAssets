import type {
  PaginatedAssets,
  AssetType,
  DownloadAssets,
} from "./types/Asset.js";
import { loadAssets } from "./index.js";
import downloadAsset from "./downloadAsset.js";
import * as Spinner from "./spinner.js";

/**
 *
 * Render BG Image
 *
 */

export function renderBGDiv(allAssets: DownloadAssets) {
  const bgContainer = document.getElementById("bg-container") as HTMLDivElement;
  const bgHeader = document.getElementById("bg-header") as HTMLDivElement;

  // Remove any old messages
  bgContainer.querySelectorAll(".not-found-message").forEach((el) => el.remove());
  bgHeader.querySelectorAll(".not-found-message").forEach((el) => el.remove());

  const gradient = `
    linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 25%),
    linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0.7) 96%, rgba(0,0,0,1) 100%)
  `;

  if (allAssets?.hero?.fullImageUrl) {
    bgContainer.style.backgroundImage = `
      ${gradient},
      url("${allAssets.hero.fullImageUrl}")
    `;
  } else {
    bgContainer.style.backgroundImage = gradient;

    const heroMsg = document.createElement("div");
    heroMsg.className = "not-found-message";
    heroMsg.textContent = "Hero image could not be found";
    bgHeader.appendChild(heroMsg);
  }

  // Remove any old logo first
  const oldLogo = document.getElementById("bg-logo");
  if (oldLogo) oldLogo.remove();

  if (allAssets?.logo?.thumbnailImageUrl) {
    const logo = document.createElement("img");
    logo.id = "bg-logo";
    logo.src = allAssets.logo.thumbnailImageUrl;
    bgHeader.appendChild(logo);
  } else {
    const logoMsg = document.createElement("div");
    logoMsg.id = "bg-logo";
    logoMsg.className = "not-found-message";
    logoMsg.textContent = "Logo doesn't exist";
    bgHeader.appendChild(logoMsg);
  }
}

/**
 *
 * Render Assets Btn Active
 *
 */

export function renderActiveAssetsBtn(type: AssetType) {
  const allAssetBtns = document.getElementsByClassName("asset-btns");
  for (const btn of allAssetBtns) {
    btn.classList.remove("active");
  }
  if (type == "hero") {
    const button = document.getElementById(`${type}es-btn`);
    button?.classList.add("active");
    return;
  }
  const button = document.getElementById(`${type}s-btn`);
  button?.classList.add("active");
}

/**
 *
 * Render Assets Grid
 *
 */

export function renderAssetsGrid(
  fetchData: PaginatedAssets,
  type: AssetType,
  appId: number
) {
  renderImages(fetchData, type);
  renderPaginationBtns(fetchData, type, appId);
}

function renderImages(fetchData: PaginatedAssets, type: AssetType) {
  const assetsGrid = document.getElementById("assets-grid");
  if (!assetsGrid) {
    console.error("No assets-grid found.");
    return;
  }

  // Update className to the current type.
  assetsGrid.className = type;

  // Clear previous assets
  assetsGrid.replaceChildren();

  fetchData.assets.forEach((asset) => {
    // Main asset image
    const img = document.createElement("img");
    img.src = asset.thumbnailImageUrl;
    img.alt = asset.author.name || "Asset";
    img.classList.add("asset-img");
    img.addEventListener("click", async () => {
      const assetCard = img.closest(".asset-card") as HTMLElement;
      if (!assetCard) return;

      assetCard.classList.add("loading");
      const spinner = Spinner.createSpinner(assetCard);

      try {
        await downloadAsset(asset.fullImageUrl, type);
      } catch (err) {
        console.error(err);
      } finally {
        Spinner.deleteSpinner(spinner);
        assetCard.classList.remove("loading");
      }
    });

    // Author profile
    const steamProfileUrl = asset.author.steamProfileUrl;

    // Author name
    const nameLink = document.createElement("a");
    nameLink.href = steamProfileUrl;
    nameLink.textContent = asset.author.name;
    nameLink.target = "_blank";
    nameLink.rel = "noopener noreferrer";

    // Profile picture
    const pfpLink = document.createElement("a");
    pfpLink.href = steamProfileUrl;
    pfpLink.target = "_blank";
    pfpLink.rel = "noopener noreferrer";

    const pfp = document.createElement("img");
    pfp.src = asset.author.avatarUrl;
    pfp.alt = `${asset.author.name}'s avatar`;
    pfp.classList.add("pfp");

    pfpLink.appendChild(pfp);

    // Name & dimensions container
    const widthHeight = document.createElement("p");
    widthHeight.textContent = `${asset.width}x${asset.height}`;

    const nameDimensionsDiv = document.createElement("div");
    nameDimensionsDiv.classList.add("name-dimensions");
    nameDimensionsDiv.appendChild(nameLink);
    nameDimensionsDiv.appendChild(widthHeight);

    // Name card container
    const namecardDiv = document.createElement("div");
    namecardDiv.classList.add("name-card");
    namecardDiv.appendChild(pfpLink);
    namecardDiv.appendChild(nameDimensionsDiv);

    // Asset card container
    const assetDiv = document.createElement("div");
    assetDiv.classList.add("asset-card");
    assetDiv.appendChild(img);
    assetDiv.appendChild(namecardDiv);

    assetsGrid.appendChild(assetDiv);
  });
}

function renderPaginationBtns(
  fetchData: PaginatedAssets,
  type: AssetType,
  appId: number
) {
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
    appendPaginationUl(paginationUl, type, appId);
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

  appendPaginationUl(paginationUl, type, appId);
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

function appendPaginationUl(
  paginationUl: HTMLUListElement,
  type: AssetType,
  appId: number
) {
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
      loadAssets(type, page, appId);
    });

    div.appendChild(clone);
  }
}

/**
 *
 * Render Search Results
 *
 */

export function renderSearchResults(
  results: { id: number; name: string }[],
  onSelect: (game: { id: number; name: string }) => void
) {
  const container = document.getElementById("search-results");
  if (!container) return;

  container.innerHTML = "";

  results.forEach((game) => {
    const item = document.createElement("div");
    item.classList.add("search-result-item");
    item.textContent = game.name;

    item.addEventListener("click", () => {
      onSelect(game);
      container.innerHTML = "";
    });

    container.appendChild(item);
  });
}
