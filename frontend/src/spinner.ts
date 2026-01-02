const spinnerWrapper = document.getElementById("spinner-wrapper") as HTMLDivElement;
const assetsGrid = document.getElementById("assets-grid") as HTMLDivElement;

export function showSpinner() {
  spinnerWrapper.style.display = "flex";
  assetsGrid.style.display = "none";
}

export function hideSpinner() {
  spinnerWrapper.style.display = "none";
  assetsGrid.style.display = "grid";
}

export function createSpinner(assetCard: HTMLElement): HTMLElement {
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  assetCard.appendChild(spinner);
  return spinner;
}

export function deleteSpinner(spinner: HTMLElement) {
  spinner.remove();
}