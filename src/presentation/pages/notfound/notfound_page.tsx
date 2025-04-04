import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header";
import Footer from "../../components/footer";

function NotFoundPage() {
  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col justify-between font-jakarta"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header></Header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <motion.div
          className="text-[#0A2540] mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FontAwesomeIcon icon={faUserAstronaut} className="text-[130px]" />
        </motion.div>

        <h1 className="text-4xl font-extrabold text-[#0A2540] mb-2">Oops.</h1>
        <p className="text-lg text-gray-600 mb-4">
          No pudimos encontrar la página que buscas.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Puede que haya expirado o que haya un error en la URL. Intenta volver
          al inicio para encontrar lo que buscas.
        </p>
        <NavLink
          to="/home"
          className="bg-[#0A2540] text-white px-5 py-2 rounded-md hover:bg-white hover:text-[#0A2540] hover:border transition"
        >
          Volver al inicio
        </NavLink>
      </main>

      <Footer></Footer>
    </motion.div>
  );
}

export default NotFoundPage;
