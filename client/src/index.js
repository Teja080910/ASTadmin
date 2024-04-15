import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './collection/redux/store';
import { SessionProvider } from './collection/session/SessionProvider';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider>
      <Provider store={store}>
        <ChakraProvider toastOptions={{ defaultOptions: { position: 'bottom' } }}>
          <App />
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  </React.StrictMode>
);
reportWebVitals();
