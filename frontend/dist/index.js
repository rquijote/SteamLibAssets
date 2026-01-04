import * as Fetch from "./fetchAssets.js";
import * as RenderAssets from "./renderAssets.js";
import * as Spinner from "./spinner.js";
import * as RenderHomepage from "./renderHomepage.js";
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
RenderHomepage.showHomepage();
/**
 *
 * Search Bar Initialisation
 *
 */
initAllSearches((type, page, appId) => {
    loadAssets(type, page, appId);
    selectedAppId = appId;
});
/**
 *
 * Header Title Event Listener
 *
 */
const headerTitle = document.getElementById("header-title");
headerTitle?.addEventListener("click", () => {
    RenderHomepage.showHomepage();
});
/**
 *
 * Quick Links Homepage
 *
 */
const quicklinks = [
    { name: "Hades 2", appId: 5376530 },
    { name: "Stray", appId: 5262075 },
    { name: "Ori and the Blind Forest", appId: 3360 },
    { name: "Elden Ring", appId: 5277816 },
    { name: "DAVE THE DIVER", appId: 5325005 },
    { name: "Red Dead Redemption II", appId: 5249031 },
];
const quicklinksGrid = document.querySelector(".quicklinks-grid");
if (quicklinksGrid) {
    quicklinks.forEach((link) => {
        const div = document.createElement("div");
        div.className = "quicklink";
        div.textContent = link.name;
        div.addEventListener("click", () => {
            RenderHomepage.hideHomepage();
            loadAssets("grid", firstPage, link.appId);
        });
        quicklinksGrid.appendChild(div);
    });
}
/**
 *
 * Load Assets Event Listener
 *
 */
gridsBtn.addEventListener("click", () => loadAssets("grid", firstPage, selectedAppId));
heroesBtn.addEventListener("click", () => loadAssets("hero", firstPage, selectedAppId));
logosBtn.addEventListener("click", () => loadAssets("logo", firstPage, selectedAppId));
iconsBtn.addEventListener("click", () => loadAssets("icon", firstPage, selectedAppId));
export async function loadAssets(type, pageNum, appId) {
    let fetchData;
    Spinner.showSpinner();
    // Load only when switching to a different appId
    const isNewApp = selectedAppId !== appId;
    if (isNewApp)
        showLoadingState();
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
    const allAssets = await Fetch.fetchAll(appId);
    RenderAssets.renderActiveAssetsBtn(type);
    RenderAssets.renderBGDiv(allAssets);
    RenderAssets.renderAssetsGrid(fetchData, type, appId);
    if (isNewApp)
        hideLoadingState();
    Spinner.hideSpinner();
    selectedAppId = appId;
}
function showLoadingState() {
    const bgContainer = document.getElementById("bg-container");
    if (bgContainer) {
        bgContainer.style.backgroundImage = `
    linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 25%),
    linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0.7) 96%, rgba(0,0,0,1) 100%)
  `;
    }
    const bgLogo = document.getElementById("bg-logo");
    if (bgLogo) {
        bgLogo.style.display = "none";
    }
}
function hideLoadingState() {
    const bgLogo = document.getElementById("bg-logo");
    if (bgLogo) {
        bgLogo.style.display = "block";
    }
}
//# sourceMappingURL=index.js.map