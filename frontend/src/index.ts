declare const JSZip: any;
import * as Fetch from "./fetchAssets.js";
import * as Render from "./renderAssets.js";
import type { AssetType } from "./types/Asset.js";

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
loadAssets("grids");

appIdButton!.addEventListener("click", enterAppIDButtonClick);
downloadBtn!.addEventListener("click", downloadButtonClick);
gridsBtn!.addEventListener("click", () => loadAssets("grids"));
heroesBtn!.addEventListener("click", () => loadAssets("heroes"));
logosBtn!.addEventListener("click", () => loadAssets("logos"));
iconsBtn!.addEventListener("click", () => loadAssets("icons"));

async function loadAssets(type: AssetType) {
  let assets;
  switch (type) {
    case "grids": 
    assets = await Fetch.fetchGrids(appId);
    break
     case "heroes": 
    assets = await Fetch.fetchHeroes(appId);
    break
     case "logos": 
    assets = await Fetch.fetchLogos(appId);
    break
     case "icons": 
    assets = await Fetch.fetchIcons(appId);
    break
  }
  // Should have a loading icon here during this.
  console.log(assets);
  Render.renderImages(assets, type);
}

async function enterAppIDButtonClick() {
  const appIdInputValue = (<HTMLInputElement>(
    document.getElementById("appIdInput")
  )).value;
  if (appIdInputValue == null) return;
  appId = Number(appIdInputValue);
  loadAssets("grids");
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