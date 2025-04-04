import {
  faFacebook,
  faGithub,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0A2540] text-white text-center py-6 mt-10 font-jakarta">
      <div className="flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm mb-2 md:mb-0">
          © Todos los derechos reservados. Blog académico ScienceUTM.
        </p>
        <div className="flex space-x-3 text-xl">
          <NavLink to="#">
            <FontAwesomeIcon icon={faFacebook} />
          </NavLink>
          <NavLink to="#">
            <FontAwesomeIcon icon={faTwitter} />
          </NavLink>
          <NavLink to="#">
            <FontAwesomeIcon icon={faYoutube} />
          </NavLink>
          <NavLink to="#">
            <FontAwesomeIcon icon={faGithub} />
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
