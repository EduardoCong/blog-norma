export interface User {
  id_autor: number;
  nombre: string | null;
  biografia: string | null;
  foto_perfil: string | null;
  nombre_usuario: string;
  email: string;
  contraseña: string;
  fecha_registro: string;
  id_rol: number;
  token: string | null;
  token_expires: string | null;
}
