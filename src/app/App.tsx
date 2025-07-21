import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../shared/ui/Footer';

const AppContent = () => {
  return (
    <div>
      <p>123</p>
      <Footer />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
