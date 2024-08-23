import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../services/userCrudService"; // Import the deleteUser function

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string; // Added email field
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(Number(id)); // Use deleteUser function
        navigate(0); // Refresh the page by navigating to the same route
      } catch (error) {
        console.error("Failed to delete user", error);
      }
    }
  };

  const handleAdd = () => {
    navigate("/add-deliverer"); // Navigate to the add deliverer page
  };

  return (
    <Box>
      <Button color="primary" onClick={handleAdd} sx={{ mb: 2 }}>
        Ajouter un nouveau Livreur
      </Button>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {users.map((user) => (
          <ListItem
            key={user.id}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <Box sx={{ flex: 1 }}>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={user.email}
              />
            </Box>
            <IconButton color="primary" onClick={() => handleDelete(user.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton color="primary" sx={{ ml: 1 }}>
              <EditIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
