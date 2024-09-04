import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import { createOrder } from "../services/orderService"; // Service pour envoyer la requête POST

const AddOrderForm: React.FC = () => {
  const [weight, setWeight] = useState<number | "">("");
  const navigate = useNavigate();
  const storeId = new URLSearchParams(window.location.search).get("storeId");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value) || ""); // Convertir en nombre
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (weight === "") {
        throw new Error("Weight is required");
      }
      // Envoie des données au backend avec poids et storeId
      await createOrder({ weight, storeId: storeId || "" });
      // Redirection vers la page des commandes
      navigate(`/stores/orders?storeId=${storeId}`, { replace: true });
      //   navigate('stores/orders');
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
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Ajouter Commande
        </Button>
      </form>
    </Box>
  );
};

export default AddOrderForm;
