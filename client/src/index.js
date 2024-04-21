import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <SessionProvider>
      // <Provider store={store}>
        <ChakraProvider toastOptions={{ defaultOptions: { position: 'bottom' } }}>
          <App />
        </ChakraProvider>
      // </Provider>
    // </SessionProvider>
  // </React.StrictMode>
);
reportWebVitals();
