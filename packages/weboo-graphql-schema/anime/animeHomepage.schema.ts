import gql from 'graphql-tag';

export const ANIME_HOMEPAGE_SCHEMA = gql`
# randomPage => 1-30
query HomeQuery($randomPage: Int) {
  list:Page(page: 1, perPage: 36) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(type: ANIME) {
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
    mediaTrends(trending_lesser: 20) {
      mediaId
      trending
      averageScore
      popularity
      media {
        id
        bannerImage
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        description
      }
    }
  }
}
`;