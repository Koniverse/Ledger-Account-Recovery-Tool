import { ModalContextProvider } from '@subwallet/react-ui';
import { ScreenContextProvider } from 'contexts/ScreenContext';
import { ThemeProvider } from 'contexts/ThemeContext';
import { WalletModalContext } from 'contexts/WalletModalContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalContextProvider>
        <WalletModalContext>
          <ScreenContextProvider>
            <App />
          </ScreenContextProvider>
        </WalletModalContext>
      </ModalContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
