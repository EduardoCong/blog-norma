import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer";
import Header from "../../components/header";
import CrearArticuloModal from "../uploads/modal_upload";
import {usePerfilController} from "../../controllers/profileController"
import SpinnerLoader from "../../components/spinnerLoading";

const PerfilPage = () => {
  const {
    perfil,
    loading,
    showPassword,
    setShowPassword,
    newPassword,
    setNewPassword,
    editandoBio,
    setEditandoBio,
    nuevaBio,
    setNuevaBio,
    mostrarModal,
    setMostrarModal,
    handleGuardarPassword,
    actualizarBiografia,
    getRootProps,
    getInputProps,
    isDragActive,
    navigate
  } = usePerfilController();

  if (loading || !perfil)
    return <SpinnerLoader />;

  return (
    <motion.main
      className="min-h-screen bg-[#F5F8FA] rounded-xl shadow-md font-jakarta flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header showBackButton onBackButtonClick={() => navigate(-1)}></Header>

      <main className="m-10 flex-2">
        <h2 className="text-2xl mb-6">Detalles personales</h2>

        <div className="flex justify-center items-center gap-6 mb-6">
          {perfil.foto_perfil ? (
            <div {...getRootProps()}>
              <img
                src={perfil.foto_perfil}
                alt="Foto de perfil"
                className="w-60 h-60 object-cover rounded-full shadow-lg border hover:cursor-pointer"
              />
              <input {...getInputProps()} />
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full text-center text-gray-500 cursor-pointer hover:bg-gray-100"
            >
              <input {...getInputProps()} />
              {isDragActive ? "Suelta la imagen" : "Subir imagen"}
            </div>
          )}

          <button
            onClick={() => setMostrarModal(true)}
            className="group flex flex-col items-center transition-transform hover:scale-105 duration-300"
          >
            <div className="w-40 h-40 flex items-center justify-center bg-[#0A2540] text-white rounded-full shadow-md hover:cursor-pointer">
              <FontAwesomeIcon icon={faUpload} className="text-[64px]" />
            </div>
            <span className="mt-2 text-sm text-gray-700 group-hover:text-[#0A2540] transition-colors duration-300">
              Subir artículo
            </span>
          </button>

          {mostrarModal && (
            <CrearArticuloModal onClose={() => setMostrarModal(false)} />
          )}
        </div>

        <div className="space-y-6">
          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Nombre de usuario</p>
            <p className="text-lg">{perfil.nombre_usuario}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Correo electrónico</p>
            <p className="text-lg">{perfil.email}</p>
          </div>

          <div className="border-b pb-3">
            <p className="text-sm text-gray-500">Contraseña</p>
            {showPassword ? (
              <div className="flex items-center justify-between gap-4">
                <input
                  type="password"
                  className="border p-2 rounded-lg text-sm w-full"
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleGuardarPassword}
                    className="h-9 w-20 bg-black rounded-[12px] text-[12px] text-white hover:cursor-pointer hover:bg-green-800"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setShowPassword(false)}
                    className="h-9 w-20 bg-black rounded-[12px] text-[12px] text-white hover:cursor-pointer hover:bg-red-800"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-lg">**********</p>
                <button
                  onClick={() => setShowPassword(true)}
                  className="text-[0a192f] hover:text-blue-800"
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="hover: cursor-pointer"
                  />
                </button>
              </div>
            )}
          </div>

          <div className="pb-3">
            <p className="text-sm text-gray-500">Biografía</p>
            {editandoBio ? (
              <div className="flex items-center justify-between gap-4">
                <textarea
                  rows={2}
                  className="border p-2 rounded-lg text-sm w-full"
                  placeholder="Agrega una biografía"
                  value={nuevaBio}
                  onChange={(e) => setNuevaBio(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={actualizarBiografia}
                    className="h-9 w-20 bg-black rounded-[12px] hover:cursor-pointer text-[12px] text-white hover:bg-green-800"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoBio(false)}
                    className="h-9 w-20 bg-black rounded-[12px] hover:cursor-pointer text-[12px] text-white hover:bg-red-800"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-lg italic text-gray-800">
                  {perfil.biografia ? `“${perfil.biografia}”` : "None set"}
                </p>
                <button
                  onClick={() => {
                    setEditandoBio(true);
                    setNuevaBio(perfil.biografia || "");
                  }}
                  className="text-[0a192f] hover:text-blue-800"
                >
                  <FontAwesomeIcon
                    icon={perfil.biografia ? faPen : faPlus}
                    className="hover:cursor-pointer"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer></Footer>
    </motion.main>
  );
};

export default PerfilPage;
