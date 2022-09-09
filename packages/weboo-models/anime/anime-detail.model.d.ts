import { CoverImage, Title } from "./anime.model";

export interface Node {
  name: string;
  isAnimationStudio: boolean;
  siteUrl: string;
  id: number;
}

export interface Studios {
  nodes: Node[];
}

export interface StartDate {
  year: number;
  month: number;
  day: number;
}

export interface EndDate {
  year: number;
  month: number;
  day: number;
}

export interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}

export interface StreamingEpisode {
  thumbnail: string;
  title: string;
  url: string;
  site: string;
}


export interface Media {
  id: number;
  description: string;
  title: Title;
  source: string;
  isAdult: boolean;
  genres: string[];
  popularity: number;
  averageScore: number;
  meanScore: number;
  trending: number;
  studios: Studios;
  format: string;
  episodes: number;
  status: string;
  startDate: StartDate;
  endDate: EndDate;
  trailer: Trailer;
  streamingEpisodes: StreamingEpisode[];
  bannerImage: string;
  coverImage: CoverImage;
  seasonYear: number;

}

export interface AnimeDetailModel {
  Media: Media;
}



