import type { Asset, PaginatedAssets } from "./types/Asset.js";

const API_BASE = "http://localhost:5062/api/assets"; // temp port for local host

export async function fetchGrids(appId: number): Promise<PaginatedAssets> {
  const res = await fetch(`${API_BASE}/grids/${appId}`);
  if (!res.ok) throw new Error("Failed to fetch grids");
  const data: PaginatedAssets = await res.json();
  return data;
}

export async function fetchHeroes(appId: number): Promise<PaginatedAssets> {
  const res = await fetch(`${API_BASE}/heroes/${appId}`);
  if (!res.ok) throw new Error("Failed to fetch heroes");
  const data: PaginatedAssets = await res.json();
  return data;
}

export async function fetchLogos(appId: number): Promise<PaginatedAssets> {
  const res = await fetch(`${API_BASE}/logos/${appId}`);
  if (!res.ok) throw new Error("Failed to fetch logos");
  const data: PaginatedAssets = await res.json();
  return data;
}

export async function fetchIcons(appId: number): Promise<PaginatedAssets> {
  const res = await fetch(`${API_BASE}/icons/${appId}`);
  if (!res.ok) throw new Error("Failed to fetch icons");
  const data: PaginatedAssets = await res.json();
  return data;
}


