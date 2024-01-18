import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from 'styled-components';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';
// import { darkTheme, lightTheme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  //#5.2에서 코인 클릭 후 router 이동시 렌더링 이슈로 <React.StrictMode> -> div로 수정
  <div>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </div>
);

reportWebVitals();
