import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/login_page";
import RegisterPage from "../pages/registrer/register_page";
import Home from "../pages/home/home_page";
import ArticuloDetallePage from "../pages/details/details_page";
import CrearArticulo from "../pages/uploads/upload_page";
import Profile from "../pages/profile/profile_page";

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/articulos/:id" element={<ArticuloDetallePage />} />
        <Route path="/crear-articulo" element={<CrearArticulo />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
