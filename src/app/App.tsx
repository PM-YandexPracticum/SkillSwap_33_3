import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound/NotFound';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Главная страница</h1>
                <p>Добро пожаловать!</p>
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
