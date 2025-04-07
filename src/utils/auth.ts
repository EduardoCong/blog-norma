export const getToken = () => localStorage.getItem("token");
export const getUserName = ():string => localStorage.getItem("nombre_usuario") || "anonimo"
export const getUserEmail = ():string => localStorage.getItem("correo") || ""
export const getUserId = () => localStorage.getItem("id_autor")
export const getUserRol = () => localStorage.getItem("rol")
export const getUserTokenExpires = () => localStorage.getItem("token_expires")
