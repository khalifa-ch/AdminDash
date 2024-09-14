import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteOrder, getOrdersInEntrepot } from "../services/orderService";
import { Delete as DeleteIcon } from "@mui/icons-material";

import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

interface Order {
  id: number;
  weight: number;
  price: number;
  status: string;
  pickedBy: { firstName: string; lastName: string };
  destination: { name: string };
}

const OrdersInEntrepotPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const entrepotId = searchParams.get("entrepotId");
  const translateStatus = (status: string) => {
    switch (status) {
      case "Pending":
        return "En attente";
      case "Shipped":
        return "Expédié";
      case "Delivered":
        return "Livré";
      case "Cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (entrepotId) {
        try {
          const fetchedOrders = await getOrdersInEntrepot(parseInt(entrepotId));
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Erreur lors de la récupération des commandes:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [entrepotId]);
  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande?")) {
      try {
        await deleteOrder(id); // Use deleteUser function
        navigate(0); // Refresh the page by navigating to the same route
      } catch (error) {
        console.error("Failed to delete commande", error);
      }
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
      <Typography variant="h4">Commandes dans l'entrepôt</Typography>
      {orders.length === 0 ? (
        <Typography variant="body1">
          Aucune commande disponible dans cet entrepôt.
        </Typography>
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper", mt: 2 }}>
          {orders.map((order) => (
            <ListItem key={order.id}>
              <ListItemText
                primary={`Commande #${order.id}`}
                secondary={
                  <Box>
                    <Typography variant="body2">
                      Poids: {order.weight} kg
                    </Typography>
                    <Typography variant="body2">
                      Prix: {order.price.toFixed(3)} dt
                    </Typography>
                    <Typography variant="body2">
                      Status: {translateStatus(order.status)}
                    </Typography>
                    <Typography variant="body2">
                      Livreur: {order.pickedBy.firstName}{" "}
                      {order.pickedBy.lastName}
                    </Typography>
                    <Typography variant="body2">
                      Destination: {order.destination.name}
                    </Typography>
                    <Box>
                      <IconButton
                        sx={{ position: "absolute", top: 4, right: 4 }}
                        color="primary"
                        onClick={() => handleDelete(order.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default OrdersInEntrepotPage;
