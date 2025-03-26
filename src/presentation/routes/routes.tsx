import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/login_page";
import RegisterPage from "../pages/registrer/register_page";
import Home from "../pages/home/home_page";
import ArticuloDetallePage from "../pages/details/details_page";

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/articulos/:id" element={<ArticuloDetallePage />} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
