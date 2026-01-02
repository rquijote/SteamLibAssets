const spinner = document.querySelector(".spinner") as HTMLDivElement;

export function showSpinner() {
  spinner.style.display = "block";
}

export function hideSpinner() {
  spinner.style.display = "none";
}