import type { Asset } from "./types/Asset.js";

const API_BASE = "http://localhost:5062/api/assets"; // temp port for local host

export async function fetchGrids(appId: number): Promise<Asset[]> {
  const res = await fetch(`${API_BASE}/grids/${appId}`);
  if (!res.ok) throw new Error("Failed to fetch grids");
  const rawData: any[] = await res.json();
  return mapAssets(rawData);
}

export async function fetchHeroes(appId: number): Promise<Asset[]> {
  const res = await fetch(`${API_BASE}/heroes/${appId}`);
  if (!res.ok) throw new Error("Failed to fetch heroes");
  const rawData: any[] = await res.json();
  return mapAssets(rawData);
}

export async function fetchLogos(appId: number): Promise<Asset[]> {
  const res = await fetch(`${API_BASE}/logos/${appId}`);
  if (!res.ok) throw new Error("Failed to fetch logos");
  const rawData: any[] = await res.json();
  return mapAssets(rawData);
}

export async function fetchIcons(appId: number): Promise<Asset[]> {
  const res = await fetch(`${API_BASE}/icons/${appId}`);
  if (!res.ok) throw new Error("Failed to fetch icons");
  const rawData: any[] = await res.json();
  return mapAssets(rawData);
}

function mapAssets(rawData: any[]): Asset[] {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];

  const isAllowed = (url: string) => {
    if (!url) return false;
    const cleanUrl = (url?.split("?")[0] ?? "").toLowerCase(); // remove query params. Url may be undefined. Otherwise, 
    // split at ? to avoid getting extra params, so we can focus on the extension type. [0] is to pick the first element in split instead of [1] which is the params.
    return allowedExtensions.some(ext => cleanUrl.endsWith(ext)); // A bit hacky, looks for .jpg, etc., returns true if found.
  };

  return rawData
    .filter(item => isAllowed(item.fullImageUrl) && isAllowed(item.thumbnailImageUrl))
    .map(item => ({
      fullImageUrl: item.fullImageUrl,
      thumbnailImageUrl: item.thumbnailImageUrl,
      width: item.width,
      height: item.height,
      author: {
        name: item.author.name,
        avatarUrl: item.author.avatarUrl,
        steamProfileUrl: item.author.steamProfileUrl,
      },
    }));
}

