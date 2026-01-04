import type { DownloadAssets, PaginatedAssets, GameAsset } from "./types/Asset.js";

const API_BASE = "http://localhost:5062/api/assets"; // temp port for local host

export async function fetchGrids(appId: number, pageNum: number): Promise<PaginatedAssets> {
  const res = await fetch(`${API_BASE}/grids/${appId}/${pageNum}`);
  if (!res.ok) throw new Error("Failed to fetch grids");
  const data: PaginatedAssets = await res.json();
  return data;
}

export async function fetchHeroes(appId: number, pageNum: number): Promise<PaginatedAssets> {
  const res = await fetch(`${API_BASE}/heroes/${appId}/${pageNum}`);
  if (!res.ok) throw new Error("Failed to fetch heroes");
  const data: PaginatedAssets = await res.json();
  return data;
}

export async function fetchLogos(appId: number, pageNum: number): Promise<PaginatedAssets> {
  const res = await fetch(`${API_BASE}/logos/${appId}/${pageNum}`);
  if (!res.ok) throw new Error("Failed to fetch logos");
  const data: PaginatedAssets = await res.json();
  return data;
}

export async function fetchIcons(appId: number, pageNum: number): Promise<PaginatedAssets> {
  const res = await fetch(`${API_BASE}/icons/${appId}/${pageNum}`);
  if (!res.ok) throw new Error("Failed to fetch icons");
  const data: PaginatedAssets = await res.json();
  return data;
}

export async function fetchAll(appId: number): Promise<DownloadAssets> {
  const res = await fetch(`${API_BASE}/all/${appId}`);
  if (!res.ok) throw new Error("Failed to fetch all assets");
  const data: DownloadAssets = await res.json();
  return data;
}

export async function searchGames(searchTerm: string): Promise<GameAsset[]> {
  const res = await fetch(`${API_BASE}/search/${searchTerm}`);
  if (!res.ok) throw new Error("Failed to fetch all assets");
  const data: GameAsset[] = await res.json();
  return data;
}

export default async function downloadAsset(url: string, fileName: string) {
  const queryUrl = new URL(`${API_BASE}/proxy`);
  queryUrl.searchParams.set("url", url);
  const res = await fetch(queryUrl.toString());
  if (!res.ok) throw new Error(`Failed to fetch image at ${url}`);
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = `${fileName}.png`;
  a.click();

  URL.revokeObjectURL(objectUrl);
}
