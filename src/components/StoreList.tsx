// // src/components/StoreList.tsx

// import React from "react";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Box,
//   Button,
// } from "@mui/material";
// import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { deleteStore } from "../services/storeService"; // Suppose que tu as déjà cette fonction

// interface Store {
//   id: string;
//   name: string;
//   address: string;
//   city: { name: string };
// }

// interface StoreListProps {
//   stores: Store[];
// }

// const StoreList: React.FC<StoreListProps> = ({ stores }) => {
//   const navigate = useNavigate();

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Êtes-vous sûr de vouloir supprimer ce magasin?")) {
//       try {
//         await deleteStore(Number(id));
//         navigate(0);
//       } catch (error) {
//         console.error("Failed to delete store", error);
//       }
//     }
//   };

//   const handleViewOrders = (storeId: string) => {
//     navigate(`/stores/orders?storeId=${storeId}`); // Navigue vers la page des commandes
//   };

//   return (
//     <Box>
//       <List sx={{ width: "100%", bgcolor: "background.paper" }}>
//         {stores.map((store) => (
//           <ListItem
//             key={store.id}
//             sx={{ display: "flex", alignItems: "center", mb: 1 }}
//           >
//             <Box sx={{ flex: 1 }}>
//               <ListItemText
//                 primary={store.name}
//                 secondary={`${store.address}, ${store.city.name}`}
//               />
//             </Box>
//             <IconButton color="primary" onClick={() => handleDelete(store.id)}>
//               <DeleteIcon />
//             </IconButton>
//             <IconButton color="primary" sx={{ ml: 1 }}>
//               <EditIcon />
//             </IconButton>
//             <Button
//               variant="contained"
//               color="secondary"
//               sx={{ ml: 1 }}
//               onClick={() => handleViewOrders(store.id)}
//             >
//               Voir les Commandes
//             </Button>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default StoreList;
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
import { deleteStore } from "../services/storeService"; // Suppose que tu as déjà cette fonction

interface Store {
  id: string;
  name: string;
  address: string;
  city: { name: string };
}

interface StoreListProps {
  stores: Store[];
}

const StoreList: React.FC<StoreListProps> = ({ stores }) => {
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce magasin?")) {
      try {
        await deleteStore(Number(id));
        navigate(0);
      } catch (error) {
        console.error("Failed to delete store", error);
      }
    }
  };

  const handleViewOrders = (storeId: string) => {
    navigate(`/stores/orders?storeId=${storeId}`); // Navigue vers la page des commandes
  };

  const handleAddStore = () => {
    navigate("/add-store"); // Navigue vers la page pour ajouter un magasin
  };

  return (
    <Box>
      {/* Ajouter le bouton "Ajouter un magasin" ici */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleAddStore}
      >
        Ajouter un magasin
      </Button>
      
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {stores.map((store) => (
          <ListItem
            key={store.id}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <Box sx={{ flex: 1 }}>
              <ListItemText
                primary={store.name}
                secondary={`${store.address}, ${store.city.name}`}
              />
            </Box>
            <IconButton color="primary" onClick={() => handleDelete(store.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton color="primary" sx={{ ml: 1 }}>
              <EditIcon />
            </IconButton>
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 1 }}
              onClick={() => handleViewOrders(store.id)}
            >
              Voir les Commandes
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StoreList;
