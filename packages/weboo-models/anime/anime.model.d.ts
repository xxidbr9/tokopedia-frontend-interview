export interface Title {
  romaji: string | null;
  english: string | null;
  native: string | null;
  userPreferred: string | null;
}

export interface CoverImage {
  extraLarge: string | null;
  large: string | null;
  medium: string | null;
  color: string | null;
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
  description: string | null;
  type: string;
  bannerImage: string | null;
  episodes: number;
  trailer?: Trailer | null;
  coverImage: CoverImage;
  isAdult?: boolean;
}

export interface AnimeListModel {
  media: AnimeMediaListItem[];
}

export interface AnimeTrendModel {
  mediaId: number;
  trending: number;
  averageScore: number;
  popularity: number;
  media: AnimeMediaListItem
}

