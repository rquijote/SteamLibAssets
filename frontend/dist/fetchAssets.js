const API_BASE = "http://localhost:5062/api/assets"; // temp port for local host
export async function fetchGrids(appId) {
    const res = await fetch(`${API_BASE}/grids/${appId}`);
    if (!res.ok)
        throw new Error("Failed to fetch grids");
    return res.json();
}
export async function fetchHeroes(appId) {
    const res = await fetch(`${API_BASE}/heroes/${appId}`);
    if (!res.ok)
        throw new Error("Failed to fetch heroes");
    return res.json();
}
export async function fetchLogos(appId) {
    const res = await fetch(`${API_BASE}/logos/${appId}`);
    if (!res.ok)
        throw new Error("Failed to fetch logos");
    return res.json();
}
export async function fetchIcons(appId) {
    const res = await fetch(`${API_BASE}/icons/${appId}`);
    if (!res.ok)
        throw new Error("Failed to fetch icons");
    return res.json();
}
//# sourceMappingURL=fetchAssets.js.map