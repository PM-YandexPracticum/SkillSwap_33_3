import { Loader } from '@/shared/ui/Loader';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('@/widgets/Layout/Layout'),
    hydrateFallbackElement: <Loader />,
    children: [
      {
        index: true,
        hydrateFallbackElement: <Loader />,
        lazy: () => import('@/pages/Home/Home'),
      },
      {
        path: 'profile',
        hydrateFallbackElement: <Loader />,
        lazy: () => import('@/pages/Profile/Profile'),
        children: [
          {
            path: 'info',
            hydrateFallbackElement: <Loader />,
            lazy: () => import('@/features/profile/Info/Info'),
          },
        ],
      },
      {
        path: 'skills/:id',
        hydrateFallbackElement: <Loader />,
        lazy: () => import('@/pages/SkillPage/SkillPage'),
      },
      {
        path: '*',
        hydrateFallbackElement: <Loader />,
        lazy: () => import('@/pages/NotFound/NotFound'),
      },
    ],
  },
  {
    path: '/registration',
    hydrateFallbackElement: <Loader />,
    lazy: () => import('@/pages/Registration/Registration'),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
