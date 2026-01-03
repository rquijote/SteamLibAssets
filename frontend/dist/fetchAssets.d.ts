import type { DownloadAssets, PaginatedAssets, GameAsset } from "./types/Asset.js";
export declare function fetchGrids(appId: number, pageNum: number): Promise<PaginatedAssets>;
export declare function fetchHeroes(appId: number, pageNum: number): Promise<PaginatedAssets>;
export declare function fetchLogos(appId: number, pageNum: number): Promise<PaginatedAssets>;
export declare function fetchIcons(appId: number, pageNum: number): Promise<PaginatedAssets>;
export declare function fetchAll(appId: number): Promise<DownloadAssets>;
export declare function searchGames(searchTerm: string): Promise<GameAsset[]>;
//# sourceMappingURL=fetchAssets.d.ts.map