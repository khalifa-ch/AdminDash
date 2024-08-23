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
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
