import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addCar } from "../services/carService";

const AddCarPage: React.FC = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    partOne: "",
    partTwo: "",
  });

  const [errors, setErrors] = useState({
    partOne: "",
    partTwo: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    const newErrors = { partOne: "", partTwo: "" };

    // Validation pour la première partie (2 ou 3 chiffres)
    if (!/^\d{2,3}$/.test(formData.partOne)) {
      newErrors.partOne = "La première partie doit contenir 2 ou 3 chiffres.";
      valid = false;
    }

    // Validation pour la deuxième partie (3 ou 4 chiffres)
    if (!/^\d{3,4}$/.test(formData.partTwo)) {
      newErrors.partTwo = "La deuxième partie doit contenir 3 ou 4 chiffres.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const licensePlate = `${formData.partOne} \u200E تونس \u200E ${formData.partTwo}`;

    try {
      await addCar({
        make: formData.make,
        model: formData.model,
        licensePlate,
      });
      navigate("/cars");
    } catch (error) {
      console.error("Failed to add car", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Ajouter une nouvelle voiture
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          name="make"
          label="Marque"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.make}
          onChange={handleChange}
        />
        <TextField
          required
          name="model"
          label="Modèle"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.model}
          onChange={handleChange}
        />
        <TextField
          required
          name="partOne"
          label="Première partie de la plaque"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.partOne}
          onChange={handleChange}
          error={!!errors.partOne}
          helperText={errors.partOne}
          inputProps={{ maxLength: 3 }}
        />
        <TextField
          required
          name="partTwo"
          label="Deuxième partie de la plaque"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={formData.partTwo}
          onChange={handleChange}
          error={!!errors.partTwo}
          helperText={errors.partTwo}
          inputProps={{ maxLength: 4 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </form>
    </Box>
  );
};

export default AddCarPage;
