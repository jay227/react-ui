import '@paychex/flex-theme/dist/flex-external-theme.min.css';
import '@paychex/kuiper-components-core/dist/kuiper-core/kuiper-core.css';
import '@paychex/kuiper-components-forms/dist/kuiper-forms/kuiper-forms.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


