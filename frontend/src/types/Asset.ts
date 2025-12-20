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

export type PaginatedAssets = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  assets: Asset[];
}