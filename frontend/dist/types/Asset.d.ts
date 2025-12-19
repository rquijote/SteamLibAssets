export interface Asset {
    fullImageUrl: string;
    thumbnailImageUrl: string;
    width: number;
    height: number;
    author: {
        name: string;
        avatarUrl: string;
        steamProfileUrl: string;
    };
}
export type AssetType = "grids" | "icons" | "heroes" | "logos";
//# sourceMappingURL=Asset.d.ts.map