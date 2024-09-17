import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { getDeliverers, getStoreOwners } from "../services/userCrudService";
import { getAllEntrepots } from "../services/entrepotService";
import { getAllStores } from "../services/storeService";
import { getAllOrders, getShippedOrders } from "../services/orderService";

const Dashboard = () => {
  const [deliverersCount, setDeliverersCount] = useState<number | null>(null);
  const [storeOwnersCount, setStoreOwnersCount] = useState<number | null>(null);
  const [entrepotCount, setEntrepotCount] = useState<number | null>(null);
  const [storesCount, setStoreCount] = useState<number | null>(null);
  const [ordersCount, setOrdersCount] = useState<number | null>(null);

  const [shippedOrdersCount, setShippedOrdersCount] = useState<number | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deliverers = await getDeliverers();
        const storeOwners = await getStoreOwners();
        const entrepots = await getAllEntrepots();
        const stores = await getAllStores();
        const orders = await getAllOrders();
        const shippedOrders = await getShippedOrders();

        setDeliverersCount(deliverers.length);
        setStoreOwnersCount(storeOwners.length);
        setEntrepotCount(entrepots.length);
        setStoreCount(stores.length);
        setOrdersCount(orders.length);
        setShippedOrdersCount(shippedOrders.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (localStorage.getItem("role") === "admin") {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card elevation={1}>
            <CardHeader
              title="Nombre de Livreurs"
              subheader="Total des livreurs sur la plateforme"
            />
            <CardContent>
              <Typography variant="h4" color="primary">
                {deliverersCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={1}>
            <CardHeader
              title="Nombre de Propriétaires de Magasins"
              subheader="Total des propriétaires de magasins sur la plateforme"
            />
            <CardContent>
              <Typography variant="h4" color="primary">
                {storeOwnersCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={1}>
            <CardHeader
              title="Nombre des entrepots"
              subheader="Total des entrepots sur la plateforme"
            />
            <CardContent>
              <Typography variant="h4" color="primary">
                {entrepotCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={1}>
            <CardHeader
              title="Nombre des magasins"
              subheader="Total des magasins sur la plateforme"
            />
            <CardContent>
              <Typography variant="h4" color="primary">
                {storesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={1}>
            <CardHeader
              title="Nombre des commandes expédiées"
              subheader="Total des commandes expédiées sur la plateforme"
            />
            <CardContent>
              <Typography variant="h4" color="primary">
                {shippedOrdersCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={1}>
            <CardHeader
              title="Nombre de commandes "
              subheader="Total de commandes  sur la plateforme"
            />
            <CardContent>
              <Typography variant="h4" color="primary">
                {ordersCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
