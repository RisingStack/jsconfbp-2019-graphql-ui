import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const globalLoader = new ApolloLink((operation, forward) => {
  // Use Mobx or Redux (or other) for a global state manager
  console.log('increment loading count');
  return forward(operation).map((response) => {
    console.log('decrement loading count');
    return response;
  });
});

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => (
          console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`)
        ));
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    globalLoader,
    new HttpLink({
      uri: 'http://localhost:8000/graphql',
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
});
