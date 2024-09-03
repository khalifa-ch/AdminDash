// src/pages/AddDelivererPage.tsx

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addDeliverer } from "../services/userCrudService";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AddDelivererPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.firstName) {
      newErrors.firstName = "Le prénom est requis";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Le nom est requis";
    }

    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validate()) {
      try {
        await addDeliverer(formData);
        navigate("/deliverers");
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Failed to add deliverer. Please try again.",
        }));
      }
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Ajouter un nouveau livreur
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="Prénom"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          name="lastName"
          label="Nom"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          name="password"
          label="Mot de passe"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        {errors.general && (
          <Typography color="error" variant="body2">
            {errors.general}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </form>
    </Box>
  );
};

export default AddDelivererPage;
