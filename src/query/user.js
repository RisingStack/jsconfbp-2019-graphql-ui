import gql from 'graphql-tag';
import fragments from './fragments';

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
          ...User
        }
      }
    }
  }
  ${fragments.user}
`;

const SIGNIN_QUERY = gql`
  query signin(
    $email: String!
    $password: String!
  ) {
    signin (
      email: $email
      password: $password
    ) {
      ...User
    }
  }
  ${fragments.user}
`;

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
        ...User
      }
    }
  }
  ${fragments.user}
`;

export default {
  GET_USERS_QUERY,
  SIGNIN_QUERY,
  CREATE_USER_MUTATION,
};
