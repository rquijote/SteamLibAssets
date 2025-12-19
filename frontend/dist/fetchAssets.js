const API_BASE = "http://localhost:5062/api/assets"; // temp port for local host
export async function fetchGrids(appId) {
    const res = await fetch(`${API_BASE}/grids/${appId}`);
    if (!res.ok)
        throw new Error("Failed to fetch grids");
    const rawData = await res.json();
    return mapAssets(rawData);
}
export async function fetchHeroes(appId) {
    const res = await fetch(`${API_BASE}/heroes/${appId}`);
    if (!res.ok)
        throw new Error("Failed to fetch heroes");
    const rawData = await res.json();
    return mapAssets(rawData);
}
export async function fetchLogos(appId) {
    const res = await fetch(`${API_BASE}/logos/${appId}`);
    if (!res.ok)
        throw new Error("Failed to fetch logos");
    const rawData = await res.json();
    return mapAssets(rawData);
}
export async function fetchIcons(appId) {
    const res = await fetch(`${API_BASE}/icons/${appId}`);
    if (!res.ok)
        throw new Error("Failed to fetch icons");
    const rawData = await res.json();
    return mapAssets(rawData);
}
function mapAssets(rawData) {
    //Filters out anything that isn't a jpg, png or jpeg.
    return rawData
        .filter((item) => {
        const url = item.fullImageUrl.toLowerCase();
        return (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg"));
    })
        .map((item) => ({
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
//# sourceMappingURL=fetchAssets.js.map