// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound/NotFound';
import { Layout } from '@/widgets/Layout/Layout';
import Home from '@/pages/Home/Home';
import ProfilePage from '@/pages/Profile/Profile';
import Info from '@/features/profile/Info/Info';
import { SkillPage } from '@/pages/SkillPage/SkillPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfilePage />}>
          <Route path="info" element={<Info />} />
        </Route>
        <Route path="skills/:id" element={<SkillPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
