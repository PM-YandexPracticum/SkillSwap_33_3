// src/app/App.tsx
import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound/NotFound';
import { Layout } from '@/widgets/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <div>
              <h1>Главная страница</h1>
            </div>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
