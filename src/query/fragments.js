import gql from 'graphql-tag';

const user = gql`
  fragment User on User {
    id
    name
    username
    email
  }
`;

const comment = gql`
  fragment Comment on Comment {
    id
    content
    timestamp
    author {
      ...User
    }
  }
  ${user}
`;

const post = gql`
  fragment Post on Post {
    id
    title
    description
    content
    timestamp
    author {
      ...User
    }
    comments {
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
  ${user}
  ${comment}
`;

export default {
  user,
  post,
  comment,
};
