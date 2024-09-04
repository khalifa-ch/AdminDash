// src/pages/StorePage.tsx

import React, { useEffect, useState } from "react";
import { getMyStores } from "../services/storeService";
import StoreList from "../components/StoreList";
const StorePage: React.FC = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const fetchedStores = await getMyStores();
        setStores(fetchedStores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div>
      <h1>Liste des Magasins</h1>
      <StoreList stores={stores} />
    </div>
  );
};

export default StorePage;
