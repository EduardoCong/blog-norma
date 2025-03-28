import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/home_page";
import LoginPage from "../pages/login/login_page";
import RegisterPage from "../pages/registrer/register_page";
import ProtectedRoute from "../pages/protected_route/protected_route";
import PerfilPage from "../pages/profile/profile_page";
import NotFoundPage from "../pages/notfound/notfound_page";
import CrearArticulo from "../pages/uploads/upload_page";
import DetailsPage from "../pages/details/details_page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/articulos/:id"
        element={
          <ProtectedRoute>
            <DetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <PerfilPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/crear-articulo"
        element={
          <ProtectedRoute>
            <CrearArticulo />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
