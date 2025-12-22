import type { PaginatedAssets, AssetType } from "./types/Asset.js";
import { loadAssets } from "./index.js";

/**
 * 
 * Render Assets Grid
 * 
 */

export function renderAssetsGrid(
  fetchData: PaginatedAssets,
  type: AssetType
) {
  renderImages(fetchData, type);
  renderPaginationBtns(fetchData, type);
}

function renderImages(fetchData: PaginatedAssets, type: AssetType) {
  const assetsGrid = document.getElementById("assets-grid");
  assetsGrid?.replaceChildren();
  fetchData.assets.forEach((asset) => {
    const img = document.createElement("img");
    img.src = asset.thumbnailImageUrl;
    assetsGrid!.appendChild(img);
  });
}

function renderPaginationBtns(fetchData: PaginatedAssets, type: AssetType) {
  const paginationUl = document.createElement("ul");
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

/**
 * 
 * Render Assets Download
 * 
 */