import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  title?: string;
  logoUrl?: string;
  children?: React.ReactNode;

  showSearch?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;

  showUser?: boolean;
  onUserClick?: () => void;

  showBackButton?: boolean;
  onBackButtonClick?: () => void;
}

function Header(props: HeaderProps) {
  const {
    title = "ScienceUTM",
    logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSy8Zl8c4c8H1mmsKu2n5EFcrBd-cn8003_g&s",
    children,
    showSearch = false,
    searchTerm = "",
    onSearchChange,
    showUser = false,
    onUserClick,
    showBackButton = false,
    onBackButtonClick,
  } = props;

  return (
    <header className="font-jakarta">
      <nav className="bg-[#0A2540] text-white shadow-md p-2">
        <div className="px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {showBackButton ? (
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={onBackButtonClick}
                  className="text-white hover:cursor-pointer rounded-[12px] p-2 hover:bg-white hover:text-[#0A2540] transition"
                >
                  <FontAwesomeIcon icon={faArrowLeft} /> Volver
                </button>

                <img src={logoUrl} alt="logo" className="h-10 w-10" />
                <div className="text-lg">{title}</div>
              </div>
            ) : (
              <>
                <img src={logoUrl} alt="logo" className="h-10 w-10" />
                <div className="text-lg">{title}</div>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {showSearch && (
              <div className="relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0A2540]"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="Buscar..."
                  className="h-9 pl-10 pr-4 py-1 rounded-[10px] bg-gray-100 text-sm text-gray-800 placeholder-[#0A2540] focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            {showUser && (
              <button
                onClick={onUserClick}
                className="w-9 h-9 flex items-center justify-center bg-white text-[#0A2540] border border-gray-200 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-800 transition hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            )}

            {children}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
