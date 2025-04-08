import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { User } from "../../domain/models/user";
import {
  getPerfil,
  updateBiografia,
  updateFotoPerfil,
  updatePassword,
} from "../../domain/services/profileService";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/errorHandler";

export const usePerfilController = () => {
  const [perfil, setPerfil] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [editandoBio, setEditandoBio] = useState(false);
  const [nuevaBio, setNuevaBio] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const perfilData = await getPerfil();
        setPerfil(perfilData);
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  const handleGuardarPassword = async () => {
    try {
      await toast.promise(
        updatePassword(newPassword),{
          loading: "Actualizando contrasena...",
            success: "¡Contrasena actualizada!",
        }
      );
      setShowPassword(false);
      setNewPassword("");
    } catch (error) {
      getErrorMessage(error);
    }
  };

  const actualizarBiografia = async () => {
    try {
      await toast.promise(
        updateBiografia(nuevaBio),{
          loading: "Actualizando biografia...",
            success: "¡Biogradia actualizada!",
        }
      );
      setPerfil((prev) => (prev ? { ...prev, biografia: nuevaBio } : prev));
      setEditandoBio(false);
    } catch (error) {
      getErrorMessage(error);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result?.toString();
      if (base64) {
        try {
          const secureUrl = await toast.promise(updateFotoPerfil(base64), {
            loading: "Subiendo imagen...",
            success: "¡Foto de perfil actualizada!",
          });
          setPerfil((prev) => prev? {...prev, foto_perfil: `${secureUrl}`}: prev);
        } catch (error) {
          getErrorMessage(error);
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return {
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
    navigate,
  };
};
