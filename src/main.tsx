import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';



const queryClient = new QueryClient();

const theme = createTheme({
    primaryColor: 'blue',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
      <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);