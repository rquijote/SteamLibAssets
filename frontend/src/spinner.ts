const spinner = document.querySelector(".spinner") as HTMLDivElement;

export function showSpinner() {
  spinner.style.display = "block";
}

export function hideSpinner() {
  spinner.style.display = "none";
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