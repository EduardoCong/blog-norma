import { AnimatePresence, motion } from "framer-motion";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useHomepageController } from "../../controllers/homePageController";
import { NavLink } from "react-router-dom";
import SpinnerLoader from "../../components/spinnerLoading";

const ScienceUTMHomepage = () => {
  const {
    filteredNews,
    searchTerm,
    setSearchTerm,
    dropdownOpen,
    toggleDropdown,
    dropdownKey,
    handleLogout,
    setDropdownOpen,
    loading,
  } = useHomepageController();

  if (loading) return <SpinnerLoader />;

  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col font-torres"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Header
        showSearch
        searchTerm={searchTerm}
        onSearchChange={(val) => setSearchTerm(val)}
        showUser
        onUserClick={toggleDropdown}
      ></Header>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            key={dropdownKey}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-15 right-6 w-40 bg-white shadow-lg text-sm z-50 rounded-md overflow-hidden"
          >
            <NavLink
              to="/profile"
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 text-gray-800 hover:bg-[#0a192f] hover:text-white hover:cursor-pointer"
            >
              Perfil
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-[#0a192f] text-red-600 hover:text-white hover:cursor-pointer"
            >
              Cerrar sesión
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto max-w-6xl px-10 py-10 flex-2">
        <h2 className="text-3xl mb-2 font-jakarta">ScienceUTM</h2>
        <p className="mb-6 text-gray-700 text-lg">
          Mantente informado con las últimas noticias y descubrimientos.
        </p>

        {filteredNews.length === 0 ? (
          <p className="text-center text-gray-500">
            No se encontraron artículos.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {filteredNews.slice(1, 4).map((articulo) => (
                <NavLink
                  key={articulo.id_articulo}
                  to={`/articulos/${articulo.id_articulo}`}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <img
                    src={articulo.imagen_principal}
                    alt={articulo.titulo}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base text-[#0A2540] mb-1 break-words whitespace-normal">
                      {articulo.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {articulo.contenido}
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>

            <NavLink to={`/articulos/${filteredNews[0].id_articulo}`}>
              <div className="mb-8 transition bg-white rounded-lg overflow-hidden hover:cursor-pointer">
                <img
                  src={filteredNews[0].imagen_principal}
                  alt={filteredNews[0].titulo}
                  className="w-full h-[500px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-2xl text-[#0A2540] mb-2">
                    {filteredNews[0].titulo}
                  </h3>
                  <p className="text-base text-gray-700">
                    {filteredNews[0].contenido}
                  </p>
                </div>
              </div>
            </NavLink>
          </>
        )}
      </main>

      <Footer></Footer>
    </motion.div>
  );
};

export default ScienceUTMHomepage;
