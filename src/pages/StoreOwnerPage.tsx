
import React, { useEffect, useState } from "react";
import { getStoreOwners } from "../services/userCrudService";
import { Box, Typography } from "@mui/material";
import UserList2 from "../components/UserList2";

const StoreOwnerPage: React.FC = () => {
  const [storeOwners, setStoreOwners] = useState([]);

  useEffect(() => {
    const fetchStoreOwners = async () => {
      try {
        const data = await getStoreOwners();
        setStoreOwners(data);
      } catch (error) {
        console.error("Failed to fetch StoreOwners", error);
      }
    };
    fetchStoreOwners();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Liste des propriétaires de magasin
      </Typography>
      <UserList2 users={storeOwners} />
    </Box>
  );
};

export default StoreOwnerPage;
