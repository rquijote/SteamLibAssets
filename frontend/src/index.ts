import * as Fetch from "./fetchAssets.js";
import * as Render from "./renderAssets.js";
import type { AssetType, GameAsset, PaginatedAssets } from "./types/Asset.js";

//Shift f1 -> Run Build Task to run TS watch
console.log("js file loaded");

/**
 *
 * Event Listeners
 *
 */

const gridsBtn = document.getElementById("grids-btn");
const heroesBtn = document.getElementById("heroes-btn");
const logosBtn = document.getElementById("logos-btn");
const iconsBtn = document.getElementById("icons-btn");

let appId = 5262075; // Temp default id
const firstPage = 1;
loadAssets("grid", firstPage); // Loads the initial page

let debounceTimer: number; // Used to delay search to avoid overloading API.
const searchInput = document.getElementById("appIdInput") as HTMLInputElement;
if (searchInput) setupLiveSearch(searchInput);

gridsBtn!.addEventListener("click", () => loadAssets("grid", firstPage));
heroesBtn!.addEventListener("click", () => loadAssets("hero", firstPage));
logosBtn!.addEventListener("click", () => loadAssets("logo", firstPage));
iconsBtn!.addEventListener("click", () => loadAssets("icon", firstPage));

export async function loadAssets(type: AssetType, pageNum: number) {
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
  Render.renderAssetsGrid(fetchData, type);
}

async function setupLiveSearch(input: HTMLInputElement) {
  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = window.setTimeout(async () => {
      const inputValue = input.value.trim();
      if (!inputValue) {
        Render.renderSearchResults([]); // clear results if input empty
        return;
      }

      try {
        const listData = await Fetch.searchGames(inputValue);
        Render.renderSearchResults(listData);
      } catch (err) {
        console.error(err);
      }
    }, 300);
  });
}
