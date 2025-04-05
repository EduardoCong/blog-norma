import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedExpires = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expires = localStorage.getItem("token_expires");

    if (!token || !expires) {
      navigate("/");
      return;
    }

    const now = Date.now();
    const expiresAt = new Date(expires).getTime();

    if (now > expiresAt) {
      Swal.fire({
        icon: "warning",
        title: "Sesión expirada",
        text: "Tu sesión ha expirado. Por favor inicia sesión nuevamente.",
        confirmButtonText: "Ok",
      }).then(() => {
        localStorage.clear();
        navigate("/");
      });
    } else{
      setValidating(false);
    }
  }, [navigate]);

  if (validating) return null;

  return <>{children}</>;
};

export default ProtectedExpires;
