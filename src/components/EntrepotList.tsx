import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { deleteEntrepot } from "../services/entrepotService"; // Suppose que tu crées cette fonction

interface Entrepot {
  id: string;
  name: string;
  capacity: number;
  address: string;
  city: { name: string };
}

interface EntrepotListProps {
  entrepots: Entrepot[];
}

const EntrepotList: React.FC<EntrepotListProps> = ({ entrepots }) => {
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet entrepôt?")) {
      try {
        await deleteEntrepot(Number(id));
        navigate(0); // Reload the page
      } catch (error) {
        console.error("Failed to delete entrepot", error);
      }
    }
  };

  const handleViewOrders = (entrepotId: string) => {
    navigate(`/entrepots/orders?entrepotId=${entrepotId}`);
  };
  const handleAddEntrepot = () => {
    navigate("/add-entrepot");
  };
  return (
    <Box>
      <Button
        color="primary"
        variant="contained"
        onClick={handleAddEntrepot}
        sx={{ mb: 2 }}
      >
        Ajouter un Entrepot
      </Button>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {entrepots.map((entrepot) => (
          <ListItem
            key={entrepot.id}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <Box sx={{ flex: 1 }}>
              <ListItemText
                primary={` ${entrepot.name}`}
                secondary={`${entrepot.capacity} Kg ,${entrepot.address}, ${entrepot.city.name}`}
              />
            </Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 1 }}
              onClick={() => handleViewOrders(entrepot.id)}
            >
              Voir les Commandes
            </Button>
            <IconButton
              color="primary"
              sx={{ ml: 1 }}
              onClick={() => handleDelete(entrepot.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EntrepotList;
