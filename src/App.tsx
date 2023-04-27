import Layout from './layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SeasonList from './components/SeasonList.tsx';
import { SWRConfig } from 'swr';
import { fetcher } from './api/fetcher.ts';
import { localStorageProvider } from './utils/localStorageProvider.ts';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/ErrorPage.tsx';
import SeasonContainer from './components/SeasonContainter.tsx';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <SeasonList />,
      },
      {
        path: '/season/:year',
        element: <SeasonContainer />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <HelmetProvider>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <SWRConfig
            value={{
              fetcher: fetcher,
              // persist cache to localstorage
              provider: localStorageProvider,
              // Data is static, so avoid revalidating since this is a free API
              revalidateIfStale: false,
              revalidateOnFocus: false,
              revalidateOnReconnect: false,
            }}
          >
            <Helmet titleTemplate="F1 - %s" defaultTitle="F1 - Seasons">
              <title>Seasons</title>
            </Helmet>
            <RouterProvider router={router} />
          </SWRConfig>
        </ErrorBoundary>
      </HelmetProvider>
    </>
  );
}

export default App;
