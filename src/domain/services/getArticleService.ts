import axios from "axios";
import { Article } from "../models/articles";
import { getToken } from "../../utils/auth";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getArticleById = async (id: number) => {
    const token = getToken();
    const { data }: { data: Article} = await axios.get(`${API_URL}/api2/articulos/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}