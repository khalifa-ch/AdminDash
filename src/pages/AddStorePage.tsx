import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCities, addStore } from "../services/storeService";

const AddStorePage: React.FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cityId, setCityId] = useState("");
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityList = await getCities();
        setCities(cityList);
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };
    fetchCities();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addStore({ name, address, city: cityId });
      navigate("/mystores"); // Redirige vers la liste des magasins après l'ajout
    } catch (error) {
      console.error("Failed to add store", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Nom du magasin"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Adresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        select
        label="Ville"
        value={cityId}
        onChange={(e) => setCityId(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      >
        {cities.map((city: any) => (
          <MenuItem key={city.id} value={city.id}>
            {city.name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Ajouter le magasin
      </Button>
    </Box>
  );
};

export default AddStorePage;
