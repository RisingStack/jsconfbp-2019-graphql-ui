import ApolloClient from 'apollo-boost';

// TODO: TASK 1. migrate from apollo-boost

export default new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  credentials: 'same-origin',
});
