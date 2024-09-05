import React, { useState, useEffect } from "react";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addEntrepot } from "../services/entrepotService";
import { getCities } from "../services/storeService"; // Suppose que tu as cette fonction pour récupérer les villes

const AddEntrepot: React.FC = () => {
  const [capacity, setCapacity] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [cityId, setCityId] = useState<string>(""); // Maintenant string
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupère la liste des villes
    const fetchCities = async () => {
      const citiesData = await getCities();
      setCities(citiesData);
    };
    fetchCities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEntrepot(name,capacity, address, cityId); // Pas de conversion en nombre
      navigate("/MyEntrepots"); // Redirige vers la liste des entrepôts après l'ajout
    } catch (error) {
      console.error("Failed to add entrepot", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <TextField
        required
        label="Nom Entrepot"
        type="string"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Capacité en Kg"
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(Number(e.target.value))}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Adresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Ville"
        select
        value={cityId} // `cityId` est maintenant une chaîne de caractères
        onChange={(e) => setCityId(e.target.value)} // Pas de conversion en nombre ici
        fullWidth
        sx={{ mb: 2 }}
      >
        {cities.map((city) => (
          <MenuItem key={city.id} value={city.id.toString()}>
            {city.name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Ajouter Entrepot
      </Button>
    </Box>
  );
};

export default AddEntrepot;
