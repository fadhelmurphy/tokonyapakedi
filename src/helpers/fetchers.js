
  
import { useQuery, gql } from "@apollo/client";
  export const _getAll = ({page,perPage}) => {
    // This is the GraphQL query
    const query = gql`

    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          lastPage
          currentPage
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
        page: page,
        perPage: perPage,
      };
      const { data, loading, error, refetch } = useQuery(query,{variables});
      return {result: (!loading && !error) && data.Page, loading: loading && <h1>Loading..</h1>, refetch}
    };