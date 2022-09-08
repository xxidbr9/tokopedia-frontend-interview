import gql from 'graphql-tag';

export const ANIME_LIST_SCHEMA = gql`
query ListAnime($page:Int, $perPage:Int,$id_not: Int, $genre_in: [String], $search:String) {
  list:Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(type: ANIME, genre_in: $genre_in, id_not:$id_not, search:$search, sort:POPULARITY_DESC) {
      id
      seasonYear
      genres
      idMal
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
      isAdult
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
`;