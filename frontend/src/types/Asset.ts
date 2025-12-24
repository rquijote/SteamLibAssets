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

export type AssetType = "grid" | "icon" | "hero" | "logo";

export type PaginatedAssets = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  assets: Asset[];
};

export type DownloadAssets = {
  grid: Asset;
  hero: Asset;
  logo: Asset;
  icon: Asset;
};
