import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/home_page";
import LoginPage from "../pages/login/login_page";
import RegisterPage from "../pages/registrer/register_page";
import ProtectedRoute from "../pages/protected_route/protected_route";
import PerfilPage from "../pages/profile/profile_page";
import NotFoundPage from "../pages/notfound/notfound_page";
import CrearArticulo from "../pages/uploads/upload_page";
import DetailsPage from "../pages/details/details_page";
import ProtectedExpires from "../pages/protected_route/protected_token_expires";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route>
        <Route
          path="/home"
          element={
            <ProtectedExpires>
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            </ProtectedExpires>
          }
        />

        <Route
          path="/articulos/:id"
          element={
            <ProtectedExpires>
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            </ProtectedExpires>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedExpires>
              <ProtectedRoute>
                <PerfilPage />
              </ProtectedRoute>
            </ProtectedExpires>
          }
        />
        <Route
          path="/crear-articulo"
          element={
            <ProtectedExpires>
              <ProtectedRoute>
                <CrearArticulo />
              </ProtectedRoute>
            </ProtectedExpires>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
