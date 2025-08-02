import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound/NotFound';
import { Layout } from '@/widgets/Layout/Layout';
import Home from '@/pages/Home/Home';
import { Registration } from '@/pages/Registration';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}

export default App;
