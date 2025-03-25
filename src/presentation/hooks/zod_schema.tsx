import { useState } from "react";
import { userSchema } from "../../presentation/zodValidartion/zod_validation";



const emailSchema = userSchema.pick({ email: true });
const passwordSchema = userSchema.pick({ password: true });

interface FormErrors {
  email?: string;
  password?: string;
}

const [formData, setFormData] = useState({ email: "", password: "" });
const [error, setError] = useState<FormErrors>({});

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  if (name === "email") {
    const result = emailSchema.safeParse({ email: value });
    if (!result.success) {
      const message =
        result.error.formErrors.fieldErrors.email?.[0] || "Error en email";
      setError((prev) => ({ ...prev, email: message }));
    } else {
      setError((prev) => ({ ...prev, email: undefined }));
    }
  }
  if (name === "password") {
    const result = passwordSchema.safeParse({ password: value });
    if (!result.success) {
      const message =
        result.error.formErrors.fieldErrors.password?.[0] ||
        "Error en password";
      setError((prev) => ({ ...prev, password: message }));
    } else {
      setError((prev) => ({ ...prev, password: undefined }));
    }
  }
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  try {
    userSchema.parse(formData);
    console.log("Datos válidos:", formData);
    setError({});
  } catch (err) {
    console.error("Error en submit:", err);
  }
};
