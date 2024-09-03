import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { deleteCar } from "../services/carService"; // Import the deleteCar function

interface Car {
  id: string;
  make: string;
  model: string;
  licensePlate: string;
}

interface CarListProps {
  cars: Car[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture?")) {
      try {
        await deleteCar(Number(id)); // Use deleteCar function
        navigate(0); // Refresh the page by navigating to the same route
      } catch (error) {
        console.error("Failed to delete car", error);
      }
    }
  };

  const handleAdd = () => {
    navigate("/add-car"); // Navigate to the add car page
  };

  return (
    <Box>
      <Button color="primary" onClick={handleAdd} sx={{ mb: 2 }}>
        Ajouter une nouvelle voiture
      </Button>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {cars.map((car) => (
          <ListItem
            key={car.id}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <Box sx={{ flex: 1 }}>
              <ListItemText
                primary={`${car.make} ${car.model}`}
                secondary={car.licensePlate}
              />
            </Box>
            <IconButton color="primary" onClick={() => handleDelete(car.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton color="primary" sx={{ ml: 1 }}>
              <EditIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CarList;
