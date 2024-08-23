// src/pages/DelivererPage.tsx

import React, { useEffect, useState } from "react";
import { getDeliverers } from "../services/userCrudService";
import UserList from "../components/UserList";
import { Box, Typography } from "@mui/material";

const StoreOwnerPage: React.FC = () => {
  const [deliverers, setDeliverers] = useState([]);

  useEffect(() => {
    const fetchDeliverers = async () => {
      try {
        const data = await getDeliverers();
        setDeliverers(data);
      } catch (error) {
        console.error("Failed to fetch deliverers", error);
      }
    };
    fetchDeliverers();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Liste des Livreurs
      </Typography>
      <UserList users={deliverers} />
    </Box>
  );
};

export default StoreOwnerPage;
