import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllArticles } from "../../domain/services/getArticlesServices";
import { Article } from "../../domain/models/articles";

export const useHomepageController = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownKey, setDropdownKey] = useState(0);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchArticulos = async () => {
    setLoading(true);
    try {
      const articulos = await getAllArticles();
      const reversed = articulos.reverse();
      setNews(reversed);
      setFilteredNews(reversed);
    } catch (error) {
      console.error("Error al cargar artículos:", error);
    }finally{
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    if (!dropdownOpen) setDropdownKey((prev) => prev + 1);
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchArticulos();
  }, []);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = news.filter(
        (a) =>
          a.titulo?.toLowerCase().includes(lowerSearch) ||
          a.contenido?.toLowerCase().includes(lowerSearch)
      );
      setFilteredNews(filtered);
    }, 400);
  }, [searchTerm, news]);

  return {
    filteredNews,
    searchTerm,
    setSearchTerm,
    dropdownOpen,
    toggleDropdown,
    dropdownKey,
    handleLogout,
    setDropdownOpen,
    loading,
  };
};
