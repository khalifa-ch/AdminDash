import React, { ReactNode, useContext } from "react";
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Button,
} from "@mui/material";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";

const drawerWidth = 240;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.logout();
    navigate("/login");
  };
  const role = localStorage.getItem("role");
  let menuItems;

  if (role === "admin") {
    menuItems = [
      {
        text: "Livreurs",
        icon: <AddCircleOutlineOutlined color="primary" />,
        path: "/deliverers",
      },
      {
        text: "prop.des magasins",
        icon: <AddCircleOutlineOutlined color="primary" />,
        path: "/storeOwners",
      },
      {
        text: " Mes Voitures",
        icon: <AddCircleOutlineOutlined color="primary" />,
        path: "/cars",
      },

      {
        text: "Mes Enterpots",
        icon: <AddCircleOutlineOutlined color="primary" />,
        path: "/MyEntrepots",
      },
    ];
  } else if (role === "storeowner") {
    menuItems = [
      {
        text: "Mes Magasins",
        icon: <AddCircleOutlineOutlined color="primary" />,
        path: "/MyStores",
      },
    ];
  } else {
    menuItems = [
      {
        text: "Commandes ",
        icon: <AddCircleOutlineOutlined color="primary" />,
        path: "/PickupOrders",
      },
    ];
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "primary.main",
        }}
        elevation={0}
      >
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            {localStorage.getItem("firstName") +
              " " +
              localStorage.getItem("lastName")}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>{" "}
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
        anchor="left"
      >
        <Box sx={{ padding: 3 }}>
          <Link to={"/"}>
            <Typography variant="h5">QuickShip</Typography>
          </Link>
        </Box>

        {/* Links/List Section */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor:
                  location.pathname === item.path ? "#f4f4f4" : "inherit",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          background: "#f9f9f9",
          width: "100%",
          padding: 3, // Added padding for content spacing
        }}
      >
        <Box sx={{ height: (theme) => theme.mixins.toolbar.minHeight }} />{" "}
        {/* Space for AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
