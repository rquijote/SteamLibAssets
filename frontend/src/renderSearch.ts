import * as RenderAssets from "./renderAssets.js";
import * as Fetch from "./fetchAssets.js";

export function initSearch(
  searchInput: HTMLInputElement,
  searchResults: HTMLDivElement,
  onSelect: (game: { id: number; name: string; }) => void
) {
  setupLiveSearch(searchInput, onSelect);
  setupFocusBehavior(searchInput, searchResults);
}

export function setupLiveSearch(
  input: HTMLInputElement,
  onSelect: (game: { id: number; name: string; }) => void
) {
  let debounceTimer: number; // Reduces frequent pings to the API every input.

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = window.setTimeout(async () => {
      const inputValue = input.value.trim();
      if (!inputValue) {
        RenderAssets.renderSearchResults([], onSelect);
        return;
      }

      try {
        const listData = await Fetch.searchGames(inputValue);
        RenderAssets.renderSearchResults(listData, onSelect);
      } catch (err) {
        console.error(err);
      }
    }, 300);
  });
}

// Click away closes search, clicking on will open search.
export function setupFocusBehavior(
  input: HTMLInputElement,
  resultsContainer: HTMLDivElement
) {
  input.addEventListener("focus", () => {
    resultsContainer.classList.add("visible");
    input.classList.add("active");
  });

  document.addEventListener("click", (e) => {
    if (e.target !== input && !resultsContainer.contains(e.target as Node)) {
      resultsContainer.classList.remove("visible");
      input.classList.remove("active");
    }
  });
}

