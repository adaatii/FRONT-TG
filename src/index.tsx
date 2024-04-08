import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Routes from './routes/routes';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <App>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <Routes />
      </React.StrictMode>
    </ThemeProvider>
  </App>

);

reportWebVitals();