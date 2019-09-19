import gql from 'graphql-tag';
import fragments from './fragments';

const GET_COMMENTS_QUERY = gql`
  query getComments(
    $filters: [CommentFieldFilter]
    $order: CommentFieldOrder
    $limit: Int
    $offset: Int
  ) {
    comments (
      filters: $filters
      order: $order
      limit: $limit
      offset: $offset
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        totalRecords
      }
      edges {
        node {
          ...Comment
        }
      }
    }
  }
  ${fragments.comment}
`;

// TODO: TASK 4. EXTRA write comment creation mutation
const CREATE_COMMENT_MUTATION = null;

export default {
  GET_COMMENTS_QUERY,
  CREATE_COMMENT_MUTATION,
};
