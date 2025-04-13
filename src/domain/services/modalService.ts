import axios from "axios";
import { getToken } from "../../utils/auth";
import { FormPostArticle } from "../models/articles";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const postArticle = async (article: FormPostArticle) => {
  const token = getToken();

  const { data }: { data: FormPostArticle } = await axios.post(
    `${API_URL}/uploads/crearArticulos`,
    article,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
