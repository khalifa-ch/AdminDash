import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteOrder, getMyOrders } from "../services/orderService";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";

interface Order {
  id: number;
  weight: number;
  price: number;
  status: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
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
      return status; // Renvoie le statut tel quel si non défini
  }
};

const OrderPage: React.FC = () => {
  const query = useQuery();
  const storeId = query.get("storeId");
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getMyOrders(storeId || "");
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [storeId]);
  const handleAddOrderClick = () => {
    navigate(`/add-order?storeId=${storeId}`);
  };
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

  return (
    <div>
      <h1>Commandes du Magasin</h1>
      <Box>
        <Button color="primary" onClick={handleAddOrderClick} sx={{ mb: 2 }}>
          Ajouter une nouvelle commande
        </Button>
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper", paddingTop: 2 }}>
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
                    Statut: {translateStatus(order.status)}
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
    </div>
  );
};

export default OrderPage;
