import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography, MenuItem } from "@mui/material";
import { createOrder } from "../services/orderService"; // Service pour envoyer la requête POST
import { getCities } from "../services/storeService"; // Service pour obtenir les villes

const AddOrderForm: React.FC = () => {
  const [weight, setWeight] = useState<number | "">("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState<string>(""); // Nouveau champ pour le numéro de téléphone
  const [cityId, setCityId] = useState<string>(""); // ID de la ville
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]); // Liste des villes
  const navigate = useNavigate();
  const storeId = new URLSearchParams(window.location.search).get("storeId");

  // Récupérer la liste des villes
  useEffect(() => {
    const fetchCities = async () => {
      const citiesData = await getCities();
      setCities(citiesData);
    };
    fetchCities();
  }, []);

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value) || ""); // Convertir en nombre
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientPhoneNumber(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (weight === "" || !clientPhoneNumber || !cityId) {
        throw new Error("Tous les champs sont obligatoires");
      }

      // Envoie des données au backend
      await createOrder({
        weight: Number(weight),
        storeId: storeId || "",
        clientPhoneNumber,
        cityId: cityId || "",
      });

      // Redirection vers la page des commandes
      navigate(`/stores/orders?storeId=${storeId}`, { replace: true });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la commande:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Ajouter une Nouvelle Commande
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          name="weight"
          label="Poids (kg)"
          type="number"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={weight === "" ? "" : weight}
          onChange={handleWeightChange}
        />
        <TextField
          required
          name="clientPhoneNumber"
          label="Numéro de téléphone du client"
          type="text"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={clientPhoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <TextField
          label="Destination"
          select
          value={cityId}
          onChange={handleCityChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          {cities.map((city) => (
            <MenuItem key={city.id} value={city.id.toString()}>
              {city.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Ajouter Commande
        </Button>
      </form>
    </Box>
  );
};

export default AddOrderForm;
