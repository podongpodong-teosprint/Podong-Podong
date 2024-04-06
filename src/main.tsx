import App from 'App';
import TestPage from 'pages/TestPage.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from 'store';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainPage from 'pages/MainPage';

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/index');
    return worker.start();
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '/main',
    element: <MainPage />,
  },
]);

const queryClient = new QueryClient();

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  )
);
