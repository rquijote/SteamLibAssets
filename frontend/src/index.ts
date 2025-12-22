declare const JSZip: any;
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
loadAssets("grids", firstPage);
loadDefaultDownloadAssets();

appIdButton!.addEventListener("click", enterAppIDButtonClick);
downloadBtn!.addEventListener("click", downloadButtonClick);
gridsBtn!.addEventListener("click", () => loadAssets("grids", firstPage));
heroesBtn!.addEventListener("click", () => loadAssets("heroes", firstPage));
logosBtn!.addEventListener("click", () => loadAssets("logos", firstPage));
iconsBtn!.addEventListener("click", () => loadAssets("icons", firstPage));

export async function loadDefaultDownloadAssets() {
  const allAssets = await Fetch.fetchAll(appId);
  console.log(allAssets);
}

export async function loadAssets(type: AssetType, pageNum: number) {
  let fetchData: PaginatedAssets;
  switch (type) {
    case "grids": 
    fetchData = await Fetch.fetchGrids(appId, pageNum);
    break
     case "heroes": 
    fetchData = await Fetch.fetchHeroes(appId, pageNum);
    break
     case "logos": 
    fetchData = await Fetch.fetchLogos(appId, pageNum);
    break
     case "icons": 
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
  loadAssets("grids", firstPage);
}

/* This whole function needs to be redone. */
async function downloadButtonClick() {
  const imgs = document.querySelectorAll("img"); // Selects all imgs
  let urls: string[] = [];
  imgs.forEach((el) => {
    if ((el.nextElementSibling! as HTMLInputElement).checked) {
      // Presumes all next element of img are an HTMLInputElement.
      urls.push(el.src);
    }
  });

  const promises = urls.map(async (url) => {
    const result = await fetch(url);
    const blob = await result.blob();
    return blob;
  });

    const imgNames : string[] = [
    "main_capsule_img",
    "small_capsule_img",
    "header_img",
    "library_capsule_img",
    "2xlibrary_capsule_img",
    "library_hero_img",
  ];


  const blobs = await Promise.all(promises);
  const zip = new JSZip();
  blobs.forEach((blob, index) => {
    zip.file(`${index}_${imgNames[index]}.jpg`, blob);
  });

  const zipFile = await zip.generateAsync({type: "blob"});
  console.log(zipFile);

  downloadZip(zipFile);
}

function downloadZip(file: any) {
  const a = document.createElement("a");
  a.download = "test.zip";
  const url = URL.createObjectURL(file);
  a.href = url;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}