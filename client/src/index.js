import React from 'react';
import ReactDOM from 'react-dom/client';
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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);