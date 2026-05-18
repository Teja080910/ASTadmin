import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { persistor, store } from './collection/redux/store/configurestore';
import theme from './theme';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top-right', duration: 3000, isClosable: true } }}>
        <App />
      </ChakraProvider>
    </PersistGate>
  </Provider>
);

reportWebVitals();
