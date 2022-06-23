import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_OMNI_SERVER_ENDPOINT || 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_OMNI_WS_ENDPOINT || 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
