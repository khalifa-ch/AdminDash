import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getCars } from "../services/carService";
import CarList from "../components/CarList"; // Import CarList
interface Car {
  id: string;
  make: string;
  model: string;
  licensePlate: string;
}
const CarPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des voitures", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Liste des voitures
      </Typography>
      <CarList cars={cars} />
    </Box>
  );
};

export default CarPage;
