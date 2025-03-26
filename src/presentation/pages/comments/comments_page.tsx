// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";

// const ComentariosPage = () => {
//   interface Comentario {
//     id_comentario: number;
//     nombre_usuario: string;
//     contenido: string;
//     fecha_comentario: string;
//     id_articulo: number;
//   }

//   const { id } = useParams();
//   const [comentarios, setComentarios] = useState<Comentario[]>([]);
//   const [nuevoComentario, setNuevoComentario] = useState("");

//   useEffect(() => {
//     const fetchComentarios = async () => {
//       try {
//         if (!id) return;
//         const { data } = await axios.get(`http://localhost:4000/api2/comentarios/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setComentarios(data);
//       } catch (err) {
//         console.error("Error al obtener comentarios:", err);
//       }
//     };

//     fetchComentarios();
//   }, [id]);

//   const handleComentarioSubmit = async () => {
//     if (!nuevoComentario.trim()) return;
//     try {
//         try {
//             await axios.post(`http://localhost:4000/api2/comentarios/${id}`, {
//               nombre_usuario: localStorage.getItem("nombre_usuario"),
//               email_usuario: localStorage.getItem("correo"),
//               contenido: nuevoComentario,
//             }, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             });
          
//             setComentarios(prev => [
//               ...prev,
//               {
//                 id_comentario: Date.now(),
//                 nombre_usuario: localStorage.getItem("nombre_usuario") || "Anónimo",
//                 contenido: nuevoComentario,
//                 fecha_comentario: new Date().toISOString(),
//                 id_articulo: Number(id),
//               }
//             ]);
          
//             setNuevoComentario("");
//           } catch (err) {
//             console.error("Error al enviar comentario:", err);
//           }
          
//     } catch (err) {
//       console.error("Error al enviar comentario:", err);
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-screen bg-white text-[#1A2B3C] font-torres px-6 py-10"
//       initial={{ y: 100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       exit={{ y: 100, opacity: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       <h1 className="text-2xl font-bold text-blue-800 text-center mb-6">Comentarios del Artículo</h1>

//       <div className="max-w-2xl mx-auto space-y-4">
//         {comentarios.length > 0 ? comentarios.map((comentario) => (
//           <div
//             key={comentario.id_comentario}
//             className="border border-gray-200 p-4 rounded-lg shadow-sm"
//           >
//             <p className="font-semibold text-blue-800">
//               {comentario.nombre_usuario}
//               <span className="text-xs text-gray-500 ml-2">
//                 {new Date(comentario.fecha_comentario).toLocaleString()}
//               </span>
//             </p>
//             <p className="text-sm text-gray-700 mt-1">{comentario.contenido}</p>
//           </div>
//         )) : (
//           <p className="text-sm text-gray-500 text-center">No hay comentarios aún.</p>
//         )}

//         <div className="mt-6">
//           <textarea
//             className="w-full border rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Escribe tu comentario..."
//             value={nuevoComentario}
//             onChange={(e) => setNuevoComentario(e.target.value)}
//             rows={3}
//           ></textarea>
//           <button
//             onClick={handleComentarioSubmit}
//             className="mt-2 bg-[#0A2540] text-white px-4 py-2 rounded-full text-sm hover:bg-[#1C3A5F] transition"
//           >
//             Enviar comentario
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ComentariosPage;