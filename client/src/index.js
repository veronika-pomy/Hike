import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthService from './utils/auth';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from './App';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// extend chakra UI theme
const colors = {
  primary: {
    main: '#242424',
    save: '#154406',
    hover: '#898888',
    txt: '#fff',
    transparent: '#000000d0',
  }
}

const theme = extendTheme({colors});

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);