import * as Fetch from "./fetchAssets.js";
import * as RenderAssets from "./renderAssets.js";
import type { AssetType, PaginatedAssets } from "./types/Asset.js";
import * as Spinner from "./spinner.js";
import * as RenderHomepage from "./renderHomepage.js"
import { initAllSearches } from "./renderSearch.js";

/**
 *
 * Initialisations 
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
//RenderHomepage.showHomepage();

/**
 *
 * Search Bar Initialisation
 *
 */

initAllSearches((type: AssetType, page: number, appId: number) => {
  loadAssets(type, page, appId);
});

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
  Spinner.showSpinner();
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
  RenderAssets.renderActiveAssetsBtn(type);
  RenderAssets.renderBGDiv(allAssets);
  RenderAssets.renderAssetsGrid(fetchData, type, appId);
  Spinner.hideSpinner();
}
