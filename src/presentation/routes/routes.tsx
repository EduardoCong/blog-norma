import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/login/login_page';
import RegisterPage from '../pages/registrer/register_page';

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;