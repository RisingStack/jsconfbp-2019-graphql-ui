import gql from 'graphql-tag';
import fragments from './fragments';

const GET_POSTS_QUERY = gql`
  query getPosts(
    $filters: [PostFieldFilter]
    $order: PostFieldOrder
    $limit: Int
    $offset: Int
  ) {
    posts (
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
          ...Post
        }
      }
    }
  }
  ${fragments.post}
`;

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $content: String!
    $author: String!
    $title: String!
    $description: String!
  ) {
    post {
      createPost(input: {
        content: $content
        author: $author
        title: $title
        description: $description
      }) {
        ...Post
      }
    }
  }
  ${fragments.post}
`;

export default {
  GET_POSTS_QUERY,
  CREATE_POST_MUTATION,
};
