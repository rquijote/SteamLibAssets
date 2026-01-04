import type { DownloadAssets, PaginatedAssets, GameAsset } from "./types/Asset.js";
export declare function fetchGrids(appId: number, pageNum: number): Promise<PaginatedAssets>;
export declare function fetchHeroes(appId: number, pageNum: number): Promise<PaginatedAssets>;
export declare function fetchLogos(appId: number, pageNum: number): Promise<PaginatedAssets>;
export declare function fetchIcons(appId: number, pageNum: number): Promise<PaginatedAssets>;
export declare function fetchAll(appId: number): Promise<DownloadAssets>;
export declare function searchGames(searchTerm: string): Promise<GameAsset[]>;
export default function downloadAsset(url: string, fileName: string): Promise<void>;
//# sourceMappingURL=fetchAssets.d.ts.map