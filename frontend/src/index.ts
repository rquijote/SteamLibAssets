import * as Fetch from "./fetchAssets.js";
import * as Render from "./renderAssets.js";
import type { AssetType, GameAsset, PaginatedAssets } from "./types/Asset.js";

//Shift f1 -> Run Build Task to run TS watch
console.log("js file loaded");

/**
 *
 * Initializations 
 *
 */

const gridsBtn = document.getElementById("grids-btn");
const heroesBtn = document.getElementById("heroes-btn");
const logosBtn = document.getElementById("logos-btn");
const iconsBtn = document.getElementById("icons-btn");

const defaultAppId = 5262075; // Temp default id
let selectedAppId = defaultAppId;
const firstPage = 1;
loadAssets("grid", firstPage, selectedAppId); // Loads the initial page

/**
 *
 * Search Bar
 *
 */

const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const searchResults = document.getElementById(
  "search-results"
) as HTMLDivElement;

if (searchInput)
  setupLiveSearch(searchInput, (game) => {
    selectedAppId = game.id;
    searchInput.value = game.name;
    loadAssets("grid", firstPage, selectedAppId);
  });

if (searchInput && searchResults) {
  searchInput.addEventListener("focus", () => {
    searchResults.classList.add("visible");
    searchInput.classList.add("active");
  });

  document.addEventListener("click", (e) => {
    if (e.target !== searchInput && !searchResults.contains(e.target as Node)) {
      searchResults.classList.remove("visible");
      searchInput.classList.remove("active");
    }
  });
}

function setupLiveSearch(
  input: HTMLInputElement,
  onSelect: (game: { id: number; name: string }) => void
) {
  let debounceTimer: number;

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = window.setTimeout(async () => {
      const inputValue = input.value.trim();
      if (!inputValue) {
        Render.renderSearchResults([], onSelect);
        return;
      }

      try {
        const listData = await Fetch.searchGames(inputValue);
        Render.renderSearchResults(listData, onSelect);
      } catch (err) {
        console.error(err);
      }
    }, 300);
  });
}

/**
 *
 * Load Assets Event Listener 
 *
 */

gridsBtn!.addEventListener("click", () =>
  loadAssets("grid", firstPage, selectedAppId)
);
heroesBtn!.addEventListener("click", () =>
  loadAssets("hero", firstPage, selectedAppId)
);
logosBtn!.addEventListener("click", () =>
  loadAssets("logo", firstPage, selectedAppId)
);
iconsBtn!.addEventListener("click", () =>
  loadAssets("icon", firstPage, selectedAppId)
);

export async function loadAssets(
  type: AssetType,
  pageNum: number,
  appId: number
) {
  let fetchData: PaginatedAssets;
  switch (type) {
    case "grid":
      fetchData = await Fetch.fetchGrids(appId, pageNum);
      break;
    case "hero":
      fetchData = await Fetch.fetchHeroes(appId, pageNum);
      break;
    case "logo":
      fetchData = await Fetch.fetchLogos(appId, pageNum);
      break;
    case "icon":
      fetchData = await Fetch.fetchIcons(appId, firstPage);
      break;
  }
  // Should have a loading icon here during this.
  let allAssets = await Fetch.fetchAll(appId);
  Render.renderActiveAssetsBtn(type);
  Render.renderBGDiv(allAssets);
  Render.renderAssetsGrid(fetchData, type, appId);
}
