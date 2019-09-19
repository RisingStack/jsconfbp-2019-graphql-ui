import gql from 'graphql-tag';
// TODO: TASK 2. EXTRA User Fragment for every query/mutation

const GET_USERS_QUERY = gql`
  query getUsers(
    $filters: [UserFieldFilter]
    $order: UserFieldOrder
    $limit: Int
    $offset: Int
  ) {
    users (
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
          id
          name
          username
          email
        }
      }
    }
  }
`;

// TODO: TASK 2. SIGNIN_QUERY
const SIGNIN_QUERY = '';

const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    user {
      createUser(input: {
        name: $name
        username: $username
        email: $email
        password: $password
      }) {
        id
        name
        username
        email
      }
    }
  }
`;

export default {
  GET_USERS_QUERY,
  SIGNIN_QUERY,
  CREATE_USER_MUTATION,
};
