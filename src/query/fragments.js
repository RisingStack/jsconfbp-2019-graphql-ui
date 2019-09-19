import gql from 'graphql-tag';

// TODO: TASK 2. EXTRA User Fragment

const comment = gql`
  fragment Comment on Comment {
    id
    content
    timestamp
    author {
      id
      name
      username
      email
    }
  }
`;

const post = gql`
  fragment Post on Post {
    id
    title
    description
    content
    timestamp
    author {
      id
      name
      username
      email
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
  ${comment}
`;

export default {
  post,
  comment,
};
