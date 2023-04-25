import Layout from './layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SeasonList from './components/SeasonList.tsx';
import { SWRConfig } from 'swr';
import { fetcher } from './api/fetcher.ts';
import { localStorageProvider } from './utils/localStorageProvider.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SeasonList />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetcher,
          provider: localStorageProvider,
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <RouterProvider router={router} />
      </SWRConfig>
    </>
  );
}

export default App;
