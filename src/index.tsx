import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './AppCore/App';
import { GlobalStyle } from './AppCore/app_style';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.Fragment>
    <App />
    <GlobalStyle />
  </React.Fragment>
);
