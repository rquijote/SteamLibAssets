import downloadAssets from "./downloadAssets.js";
import * as Fetch from "./fetchAssets.js";
import * as Render from "./renderAssets.js";
import type { AssetType, PaginatedAssets } from "./types/Asset.js";

//Shift f1 -> Run Build Task to run TS watch
console.log("js file loaded");

/**
 *
 * Event Listeners
 *
 */

const appIdButton = document.getElementById("enterAppIdBtn");
const downloadBtn = document.getElementById("downloadBtn");
const gridsBtn = document.getElementById("grids-btn");
const heroesBtn = document.getElementById("heroes-btn");
const logosBtn = document.getElementById("logos-btn");
const iconsBtn = document.getElementById("icons-btn");

let appId = 5262075 // Temp default id
const firstPage = 1;
loadAssets("grid", firstPage);
loadDefaultDownloadAssets();

appIdButton!.addEventListener("click", enterAppIDButtonClick);
downloadBtn!.addEventListener("click", () => downloadAssets(appId));
gridsBtn!.addEventListener("click", () => loadAssets("grid", firstPage));
heroesBtn!.addEventListener("click", () => loadAssets("hero", firstPage));
logosBtn!.addEventListener("click", () => loadAssets("logo", firstPage));
iconsBtn!.addEventListener("click", () => loadAssets("icon", firstPage));

export async function loadDefaultDownloadAssets() {
  const allAssets = await Fetch.fetchAll(appId);
  Render.renderAssetsDownload(allAssets);
}

export async function loadAssets(type: AssetType, pageNum: number) {
  let fetchData: PaginatedAssets;
  switch (type) {
    case "grid": 
    fetchData = await Fetch.fetchGrids(appId, pageNum);
    break
     case "hero": 
    fetchData = await Fetch.fetchHeroes(appId, pageNum);
    break
     case "logo": 
    fetchData = await Fetch.fetchLogos(appId, pageNum);
    break
     case "icon": 
    fetchData = await Fetch.fetchIcons(appId, firstPage);
    break
  }
  // Should have a loading icon here during this.
  console.log(fetchData);
  Render.renderAssetsGrid(fetchData, type);
}

async function enterAppIDButtonClick() {
  const appIdInputValue = (<HTMLInputElement>(
    document.getElementById("appIdInput")
  )).value;
  if (appIdInputValue == null) return;
  appId = Number(appIdInputValue);
  loadAssets("grid", firstPage);
}
