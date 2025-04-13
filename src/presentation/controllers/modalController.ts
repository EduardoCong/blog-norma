import { postArticle } from "../../domain/services/modalService";
import { FormPostArticle } from "../../domain/models/articles";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/errorHandler";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const usePostArticleController = () => {
  const navigate = useNavigate();

  const [labels, setLabels] = useState<string[]>([]);
  const [inputLabel, setInputLabel] = useState<string>("");

  const onSubmit = async (data: FormPostArticle, onClose?: () => void) => {
    try {
      await toast.promise(postArticle(data), {
        loading: "Subiendo articulo",
        success: "Articulo subido!",
      });
      if (onClose) return onClose();
      navigate("/home");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleEtiquetaKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputLabel.trim()) {
      e.preventDefault();
      setLabels((prev) => [...prev, inputLabel.trim()]);
      setInputLabel("");
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: (name: keyof FormPostArticle, value: string | number) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result?.toString();
        if (base64) {
          setValue("imagen_principal", base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    onSubmit,
    handleFileChange,
    handleEtiquetaKeyDown,
    labels,
    inputLabel,
    setInputLabel,
  };
};
