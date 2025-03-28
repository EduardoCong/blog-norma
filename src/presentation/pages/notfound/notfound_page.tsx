import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

function NotFoundPage() {
  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col justify-between font-jakarta"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="bg-[#0A2540] text-white shadow-md p-2">
        <div className="px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSy8Zl8c4c8H1mmsKu2n5EFcrBd-cn8003_g&s"
              alt="logo"
              className="h-10 w-10"
            />
            <div className="text-lg font-bold">ScienceUTM</div>
          </div>
        </div>
      </nav>

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
          Puede que haya expirado o que haya un error en la URL.
          Intenta volver al inicio para encontrar lo que buscas.
        </p>
        <NavLink
          to="/home"
          className="bg-[#0A2540] text-white px-5 py-2 rounded-md hover:bg-white hover:text-[#0A2540] hover:border transition"
        >
          Volver al inicio
        </NavLink>
      </main>

      <footer className="bg-[#0A2540] text-white text-center py-6">
        <div className="flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-sm mb-2 md:mb-0">
            © Todos los derechos reservados. Blog académico ScienceUTM.
          </p>
          <div className="flex space-x-3 text-xl">
            <NavLink to="#"><FontAwesomeIcon icon={faFacebook} /></NavLink>
            <NavLink to="#"><FontAwesomeIcon icon={faTwitter} /></NavLink>
            <NavLink to="#"><FontAwesomeIcon icon={faYoutube} /></NavLink>
            <NavLink to="#"><FontAwesomeIcon icon={faGithub} /></NavLink>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default NotFoundPage;
