import React from "react";
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
} from "@mui/material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";

const drawerWidth = 240;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Livreurs",
      icon: <SubjectOutlined color="primary" />,
      path: "/",
    },
    {
      text: "Magasins",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: "/create",
    },
  ];

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
          <Typography sx={{ flexGrow: 1 }}>khalifa chelbi</Typography>
          <Typography>Mario</Typography>
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
        <Box sx={{ padding: 2 }}>
          <Typography variant="h5">Ninja Notes</Typography>
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
