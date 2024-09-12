import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addDeliverer } from "../services/userCrudService";
import { getCities } from "../services/storeService";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cityId: string;
}

const AddDelivererPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cityId: "",
  });

  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    cityId?: string; // Ajout des erreurs de cityId
    general?: string;
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      const citiesData = await getCities();
      setCities(citiesData);
    };
    fetchCities();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      cityId: event.target.value,
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

    if (!formData.cityId) {
      newErrors.cityId = "La ville est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validate()) {
      try {
        await addDeliverer(formData); // Envoie l'ID de la ville avec les autres données
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
        <TextField
          label="Ville"
          select
          value={formData.cityId} // Utilise formData.cityId
          onChange={handleCityChange} // Utilise handleCityChange
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.cityId}
          helperText={errors.cityId}
        >
          {cities.map((city) => (
            <MenuItem key={city.id} value={city.id.toString()}>
              {city.name}
            </MenuItem>
          ))}
        </TextField>
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
