const API_BASE = "http://localhost:5062/api/assets"; // temp port for local host
export async function fetchGrids(appId, pageNum) {
    const res = await fetch(`${API_BASE}/grids/${appId}/${pageNum}`);
    if (!res.ok)
        throw new Error("Failed to fetch grids");
    const data = await res.json();
    return data;
}
export async function fetchHeroes(appId, pageNum) {
    const res = await fetch(`${API_BASE}/heroes/${appId}/${pageNum}`);
    if (!res.ok)
        throw new Error("Failed to fetch heroes");
    const data = await res.json();
    return data;
}
export async function fetchLogos(appId, pageNum) {
    const res = await fetch(`${API_BASE}/logos/${appId}/${pageNum}`);
    if (!res.ok)
        throw new Error("Failed to fetch logos");
    const data = await res.json();
    return data;
}
export async function fetchIcons(appId, pageNum) {
    const res = await fetch(`${API_BASE}/icons/${appId}/${pageNum}`);
    if (!res.ok)
        throw new Error("Failed to fetch icons");
    const data = await res.json();
    return data;
}
export async function fetchAll(appId) {
    const res = await fetch(`${API_BASE}/all/${appId}`);
    if (!res.ok)
        throw new Error("Failed to fetch all assets");
    const data = await res.json();
    return data;
}
export async function searchGames(searchTerm) {
    const res = await fetch(`${API_BASE}/search/${searchTerm}`);
    if (!res.ok)
        throw new Error("Failed to fetch all assets");
    const data = await res.json();
    return data;
}
//# sourceMappingURL=fetchAssets.js.map