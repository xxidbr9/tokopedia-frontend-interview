import gql from 'graphql-tag';

export const ANIME_DETAIL_SCHEMA = gql`
query DetailInfo($id: Int) {
  Media(id: $id) {
    id
    description
    title {
      romaji
      english
      native
      userPreferred
    }
    source
    isAdult
    genres
    popularity
    averageScore
    meanScore
    seasonYear
    trending
    studios {
      nodes {
        name
        isAnimationStudio
        siteUrl
        id
      }
    }
    format
    episodes
    status
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    format
    trailer {
      id
      site
      thumbnail
    }
    streamingEpisodes {
      thumbnail
      title
      url
      site
    }
    bannerImage
    coverImage {
      extraLarge
      large
      medium
      color
    }
  }
}
`;