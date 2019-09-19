import gql from 'graphql-tag';

const HELLO_QUERY = gql`
  query hello {
    hello
  }
`;

export default {
  HELLO_QUERY,
};
