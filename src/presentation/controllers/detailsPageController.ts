import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Article } from "../../domain/models/articles";
import { getArticleById } from "../../domain/services/getArticleService";
import { getAllComments } from "../../domain/services/getCommentsService";
import { postComment } from "../../domain/services/postCommentService";
import { Comments } from "../../domain/models/comments";
import { getErrorMessage } from "../../utils/errorHandler";
import { getToken, getUserEmail, getUserName } from "../../utils/auth";

export const useArticuloDetalleController = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comments[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      if (!id) return;
      const idNumber = parseInt(id, 10);
      if (isNaN(idNumber)) return;
      setLoading(true);
      try {
        const article = await getArticleById(idNumber);
        const comments = await getAllComments(idNumber);
        setArticle(article);
        setComments(comments);
      } catch (e) {
        console.error("Error al obtener datos:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleComentarioSubmit = async () => {
    if (!newComment.trim() || !id) return;

    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) return;

    const nombre_usuario = getUserName();
    const email_usuario = getUserEmail();
    const token = getToken();

    if (!token || !email_usuario) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      await postComment(idNumber, newComment);

      setComments((prev) => [
        ...prev,
        {
          nombre_usuario,
          contenido: newComment,
          fecha_comentario: new Date().toISOString(),
        },
      ]);
      setNewComment("");
    } catch (e) {
      getErrorMessage(e);
    } finally{
      setLoading(false);
    }
  };

  return {
    article,
    comments,
    loading,
    newComment,
    setNewComment,
    handleComentarioSubmit,
    navigate,
  };
};
