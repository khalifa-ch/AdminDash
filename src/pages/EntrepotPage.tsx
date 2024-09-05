// src/pages/EntrepotPage.tsx

import React, { useEffect, useState } from "react";
import { getMyEntrepots } from "../services/entrepotService"; // Suppose que tu crées cette fonction
import EntrepotList from "../components/EntrepotList";

interface Entrepot {
  id: string;
  capacity: number;
  address: string;
  city: { name: string };
}

const EntrepotPage: React.FC = () => {
  const [entrepots, setEntrepots] = useState<Entrepot[]>([]);

  useEffect(() => {
    const fetchEntrepots = async () => {
      try {
        const data = await getMyEntrepots();
        setEntrepots(data);
      } catch (error) {
        console.error("Error fetching entrepots", error);
      }
    };

    fetchEntrepots();
  }, []);

  return (
    <div>
      <h2>Mes Entrepots</h2>
      <EntrepotList entrepots={entrepots} />
    </div>
  );
};

export default EntrepotPage;
