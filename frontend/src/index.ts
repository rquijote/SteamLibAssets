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

const appId = 5262075 // Temp default id
assetBtnsClick("grids");

appIdButton!.addEventListener("click", enterAppIDButtonClick);
downloadBtn!.addEventListener("click", downloadButtonClick);
gridsBtn!.addEventListener("click", () => assetBtnsClick("grids"));
heroesBtn!.addEventListener("click", () => assetBtnsClick("heroes"));
logosBtn!.addEventListener("click", () => assetBtnsClick("logos"));
iconsBtn!.addEventListener("click", () => assetBtnsClick("icons"));

async function assetBtnsClick(type: AssetType) {
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
  // Should have a loading icon ihere during this.
  Render.renderImages(assets);
}

async function enterAppIDButtonClick() {
  const appIdInputValue = (<HTMLInputElement>(
    document.getElementById("appIdInput")
  )).value;
  if (appIdInputValue == null) return;
}

async function downloadButtonClick() {
  const imgs = document.querySelectorAll("img"); // Selects all imgs
  let urls: string[] = [];
  imgs.forEach((el) => {
    if ((el.nextElementSibling! as HTMLInputElement).checked) {
      // Presumes all next element of img are an HTMLInputElement.
      urls.push(el.src);
    }
  });
  console.log(urls);

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

/**
 *
 * Fetch Assets Functions
 *
 */

async function getAllAssets(appID: string) {
  const urls = [
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/library_600x900.jpg`, // library capsule (cover)
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/header.jpg`, // header (background)
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/logo.png`, // transparent logo (logo)
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/capsule_616x353.jpg`, // main capsule
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/capsule_231x87.jpg`, // small capsule
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appID}/library_hero.jpg`, // library hero
  ];
  let blobs: (Blob | undefined)[] = [];
  for (const url of urls) {
    const blob = await getBlob(url);
    if (blob) {
      blobs.push(blob);
    } else {
      blobs.push(undefined);
    }
  }

  return blobs;
}

async function getBlob(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await fetch(url);
    const blob = await result.blob();
    return blob;
  } catch (error: any) {
    console.error(error.message);
  }
}

/**
 *
 * Frontend DOM Functions
 *
 */

function printAllAssets(blobs: (Blob | undefined)[]) {
  for (let i = 0; i < blobs.length; i++) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let input = document.createElement("input");
    input.type = "checkbox";
    const blob = blobs[i];
    if (!blob) {
      img.src =
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
      input.checked = false;
    } else {
      img.src = URL.createObjectURL(blob);
      input.checked = true;
    }
    div.appendChild(img);
    div.appendChild(input);
    document.body.appendChild(div);
  }
}
