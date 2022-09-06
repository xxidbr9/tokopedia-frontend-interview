export interface Title {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

export interface CoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

export interface Trailer {
  id
  site
  thumbnail
}

export interface AnimeMediaListItem {
  id: number;
  seasonYear: number;
  genres: string[];
  idMal: number;
  title: Title;
  description: string;
  type: string;
  bannerImage: string;
  episodes: number;
  trailer?: Trailer | null;
  coverImage: CoverImage;
  isAdult?: boolean;
  // from redux
  bookmarks?: {
    id?: string;
  }
}

export interface AnimeListModel {
  media: AnimeMediaListItem[];
}

export interface AnimeTrendModel {
  mediaId: number;
  trending: number;
  averageScore: number;
  popularity: number;
  media: {
    id: number;
    bannerImage: string;
    title: Title;
    coverImage: CoverImage;
    description: string;
  }
}

