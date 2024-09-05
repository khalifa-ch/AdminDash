import React from "react";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import DeliveryPage from "./pages/DeliveryPage";
import AddDelivererPage from "./pages/AddDelivererPage";
import StoreOwnerPage from "./pages/StoreOwnerPage";
import AddStoreOwnerPage from "./pages/AddStoreOwnerPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import CarPage from "./pages/CarPage";
import AddCarPage from "./pages/AddCarPage";
import StorePage from "./pages/StorePage";
import OrderPage from "./pages/OrderPage";
import AddOrderForm from "./pages/AddOrderForm";
import AddStorePage from "./pages/AddStorePage";
import EntrepotPage from "./pages/EntrepotPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/deliverers" element={<DeliveryPage />} />
              <Route path="/add-deliverer" element={<AddDelivererPage />} />
              <Route path="/storeOwners" element={<StoreOwnerPage />} />
              <Route path="/add-storeOwner" element={<AddStoreOwnerPage />} />
              <Route path="/cars" element={<CarPage />} />
              <Route path="/add-car" element={<AddCarPage />} />
              <Route path="/MyStores" element={<StorePage />} />
              <Route path="/add-store" element={<AddStorePage />} />
              <Route path="/stores/orders" element={<OrderPage />} />
              <Route path="/add-order" element={<AddOrderForm />} />
              <Route path="/MyEntrepots" element={<EntrepotPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
