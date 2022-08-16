
  
import { useQuery, gql } from "@apollo/client";
  export const _getAll = () => {
    // This is the GraphQL query
    const query = gql`

    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(type: ANIME, sort: FAVOURITES_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          type
          genres
        }
      }
    }
    `;
  
      let variables = {
        page: 1,
        perPage: 16,
      };
      const { data, loading, error } = useQuery(query,{variables});
      return {result: (!loading && !error) && data.Page.media, loading: loading && <h1>Loading..</h1>}
    };