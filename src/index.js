import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './app';
import LogoutBroadcast from './logoutBroadcast';
import { LogoProvider } from "./utils/logoContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <LogoProvider>
          <LogoutBroadcast />
          <App />
        </LogoProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
