import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assignEntrepotToOrder } from "../services/orderService";
import { getAvailbleEntrepots } from "../services/entrepotService";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

interface Entrepot {
  id: number;
  name: string;
}

const AssignToEntrepotPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>(); // Récupère l'orderId depuis les paramètres de l'URL
  const [entrepots, setEntrepots] = useState<Entrepot[]>([]);
  const [selectedEntrepot, setSelectedEntrepot] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntrepots = async () => {
      try {
        const fetchedEntrepots = await getAvailbleEntrepots(); // Appelle le service pour récupérer les entrepôts
        setEntrepots(fetchedEntrepots);
      } catch (error) {
        console.error("Erreur lors de la récupération des entrepôts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrepots();
  }, []);

  const handleSubmit = async () => {
    if (selectedEntrepot && orderId) {
      try {
        await assignEntrepotToOrder(Number(orderId), selectedEntrepot);
        navigate("/PickupOrders"); // Redirige vers la page des commandes après l'assignation
      } catch (error) {
        console.error("Erreur lors de l'assignation de l'entrepôt:", error);
      }
    } else {
      console.error("Entrepôt non sélectionné ou token manquant");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4">
        Assigner un entrepôt pour la commande #{orderId}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="entrepot-label">Choisir un entrepôt</InputLabel>
          <Select
            labelId="entrepot-label"
            value={selectedEntrepot || ""}
            onChange={(e) => setSelectedEntrepot(e.target.value as number)}
          >
            {entrepots.map((entrepot) => (
              <MenuItem key={entrepot.id} value={entrepot.id}>
                {entrepot.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Soumettre
        </Button>
      </Box>
    </div>
  );
};

export default AssignToEntrepotPage;
