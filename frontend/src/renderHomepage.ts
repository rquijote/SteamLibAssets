export function showHomepage() {
    const assetPageContainer = document.getElementById("asset-page-container") as HTMLDivElement;
    assetPageContainer.style.display = "none";
    const homepageContainer = document.getElementById("homepage-container") as HTMLDivElement;
    homepageContainer.style.display = "flex";
}