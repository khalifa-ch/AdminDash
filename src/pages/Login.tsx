import React, { useContext } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogin = async () => {
    let valid = true;
    let errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "L'email est requis";
      valid = false;
    }
    if (!password) {
      errors.password = "Le mot de passe est requis";
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      try {
        const result = await login(email, password);
        authContext?.login(result.access_token); // Mise à jour du contexte
        localStorage.setItem("firstName", result.firstName);
        localStorage.setItem("lastName", result.lastName);
        localStorage.setItem("role", result.role);
        navigate("/");
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Échec de la connexion. Veuillez vérifier vos identifiants.",
        }));
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Bienvenue dans QuickShip
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        sx={{ marginBottom: 2, width: "300px" }}
      />
      <TextField
        label="Mot de passe"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        sx={{ marginBottom: 2, width: "300px" }}
      />
      <Button
        variant="contained"
        onClick={() => {
          handleLogin();
        }}
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          padding: "10px 20px",
          width: "300px",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        Se connecter
      </Button>
      {errors.general && (
        <Box
          sx={{
            marginTop: 2,
            color: "error.main",
            fontSize: "0.875rem",
            textAlign: "center",
          }}
        >
          {errors.general}
        </Box>
      )}{" "}
    </Box>
  );
};

export default Login;
