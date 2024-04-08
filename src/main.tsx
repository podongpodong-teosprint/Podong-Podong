import App from 'App';
import TestPage from 'pages/TestPage.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from 'store';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ComponentTest from 'pages/ComponetTest';
import MainPage from 'pages/MainPage';
import LibraryPage from 'pages/LibraryPage';
import WrappingFrame from 'components/cores/design/WrappingFrame';

import PodoDetailModal from 'components/library/PodoDetailModal';
import Layout from 'pages/Layout';

async function enableMocking() {
  if (true) {
    const { worker } = await import('./mocks/index');
    return worker.start();
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/test',
        element: <TestPage />,
      },
      {
        path: '/componenttest',
        element: <ComponentTest />,
      },
      {
        path: '/main',
        element: <MainPage />,
      },
      {
        path: '/library',
        element: <LibraryPage />,
      },
      {
        path: '/library/:id',
        element: <PodoDetailModal />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <WrappingFrame>
            <RouterProvider router={router} />
          </WrappingFrame>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  )
);
