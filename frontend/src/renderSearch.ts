import * as Fetch from "./fetchAssets.js";
import * as renderHomepage from "./renderHomepage.js";
import type { AssetType } from "./types/Asset.js";

export function setupLiveSearch(
  input: HTMLInputElement,
  onSelect: (game: { id: number; name: string }) => void
) {
  let debounceTimer: number; // Reduces frequent pings to the API every input.

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = window.setTimeout(async () => {
      const inputValue = input.value.trim();
      if (!inputValue) {
        renderSearchResults([], onSelect);
        return;
      }

      try {
        const listData = await Fetch.searchGames(inputValue);
        renderSearchResults(listData, onSelect);
      } catch (err) {
        console.error(err);
      }
    }, 300);
  });
}

// Initialises all searches with event listeners. Currently, the homepage and the header searches.
export function initAllSearches(
  loadAssets: (type: AssetType, firstPage: number, appId: number) => void
) {
  const inputs = document.querySelectorAll<HTMLInputElement>(".search-input");
  const firstPage = 1;

  inputs.forEach((input) => {
    const resultsContainer = input
      .closest(".search-wrapper")
      ?.querySelector(".search-results") as HTMLDivElement;

    if (!resultsContainer) return;

    setupFocusBehavior(input, resultsContainer);
    setupLiveSearch(input, (game) => {
      input.value = game.name;
      loadAssets("grid", firstPage, game.id);
    });
  });
}

// Click away closes search, clicking on input will open it
export function setupFocusBehavior(
  input: HTMLInputElement,
  resultsContainer: HTMLDivElement
) {
  input.addEventListener("focus", () => {
    if (!input.classList.contains("active")) {
      resultsContainer.classList.add("visible");
      input.classList.add("active");
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target !== input && !resultsContainer.contains(e.target as Node)) {
      resultsContainer.classList.remove("visible");
      input.classList.remove("active");
    }
  });
}

// Render search results div
export function renderSearchResults(
  results: { id: number; name: string }[],
  onSelect: (game: { id: number; name: string }) => void
) {
  const container = document.querySelector(".search-results.visible");
  if (!container) return;

  container.innerHTML = "";

  results.forEach((game) => {
    const item = document.createElement("div");
    item.classList.add("search-result-item");
    item.textContent = game.name;

    item.addEventListener("click", () => {
      onSelect(game);
      renderHomepage.hideHomepage();
      container.innerHTML = "";
    });

    container.appendChild(item);
  });
}
