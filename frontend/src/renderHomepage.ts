export function showHomepage() {
    const assetPageContainer = document.getElementById("asset-page-container") as HTMLDivElement;
    assetPageContainer.style.display = "none";
    const homepageContainer = document.getElementById("homepage-container") as HTMLDivElement;
    homepageContainer.style.display = "flex";
}

export function hideHomepage() {
    const assetPageContainer = document.getElementById("asset-page-container") as HTMLDivElement;
    assetPageContainer.style.display = "block";
    const homepageContainer = document.getElementById("homepage-container") as HTMLDivElement;
    homepageContainer.style.display = "none";
}