import React, { useEffect, useState } from "react";
import { getOrdersReadyForPickup } from "../services/orderService";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Order {
  id: number;
  weight: number;
  price: number;
  status: string;
  clientPhoneNumber: string;
  store: { name: string; address: string }; // Nom du magasin associé à la commande
}

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

const PickupOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrdersReadyForPickup();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
      <h1>Commandes Prêtes pour l'Expédition</h1>
      <List sx={{ width: "100%", bgcolor: "background.paper", paddingTop: 2 }}>
        {orders.length === 0 ? (
          <Typography variant="body1">
            Aucune commande prête pour l'expédition.
          </Typography>
        ) : (
          orders.map((order) => (
            <ListItem key={order.id}>
              <ListItemText
                primary={`Commande #${order.id} - ${order.store?.name} : ${order.store?.address}`}
                secondary={
                  <Box>
                    <Typography variant="body2">
                      Poids: {order.weight} kg
                    </Typography>
                    <Typography variant="body2">
                      Prix: {order.price.toFixed(3)} dt
                    </Typography>
                    <Typography variant="body2">
                      Numéro du client: {order.clientPhoneNumber}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2,mb:1}}
                      onClick={() =>
                        navigate(`/assign-to-entrepot/${order.id}`)
                      }
                    >
                      Soumettre dans l'entrepôt
                    </Button>
                  </Box>
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default PickupOrdersPage;
