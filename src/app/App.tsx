import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound/NotFound';
import { Layout } from '@/widgets/Layout/Layout';
import Home from '@/pages/Home/Home';
import { Registration } from '@/pages/Registration';
import ProfilePage from '@/pages/Profile/Profile';
import Info from '@/features/profile/Info/Info';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfilePage />}>
          <Route path="info" element={<Info />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}

export default App;
