import axios from "axios";
import { getToken } from "../../utils/auth";
import { Comments } from "../models/comments";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllComments = async (id: number) => {
  const token = getToken();
  const { data }: { data: Comments } = await axios.get(
    `${API_URL}/api2/comentarios/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    }
    
  );
  return Array.isArray(data) ? data : [];
};
