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

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment(
    $content: String!
    $author: String!
    $post: ID!
  ) {
    comment {
      createComment(input: {
        content: $content
        author: $author
        post: $post
      }) {
        ...Comment
      }
    }
  }
  ${fragments.comment}
`;

export default {
  GET_COMMENTS_QUERY,
  CREATE_COMMENT_MUTATION,
};
