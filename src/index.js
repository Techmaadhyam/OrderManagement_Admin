import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './app';
import LogoutBroadcast from './logoutBroadcast';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
      <LogoutBroadcast/>
        <App />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
