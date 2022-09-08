import gql from 'graphql-tag';

export const ANIME_HOMEPAGE_SCHEMA = gql`
query HomeQuery($randomPage: Int) {
  list:Page(page: 1, perPage: 36) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(type: ANIME, sort: POPULARITY_DESC) {
      id
      seasonYear
      genres
      idMal
      isAdult
      title {
        romaji
        english
        native
        userPreferred
      }
      description
      type
      bannerImage
      episodes
      trailer {
        id
        site
        thumbnail
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
    }
  }

  trend:Page(page: $randomPage, perPage: 1) {
    mediaTrends(trending_greater: 20) {
      mediaId
      trending
      averageScore
      popularity
      media {
        id
        seasonYear
        genres
        idMal
        isAdult
        title {
          romaji
          english
          native
          userPreferred
        }
        description
        type
        bannerImage
        episodes
        trailer {
          id
          site
          thumbnail
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }
}
`;