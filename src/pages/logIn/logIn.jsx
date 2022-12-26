import React from "react";
import AppBarBis from "../../components/NavBarBis/NavBarBis";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { LOGIN_USUARIO } from "../../graphql/resolvers/user.resolver";
import { useLazyQuery } from "@apollo/client";


const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  }); 

  const [loginUsuario, { error, loading, data }] = useLazyQuery(LOGIN_USUARIO, {
    variables: {
      email: formState.email,
      password: formState.password,
    } 
  });
  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error: </p>;
   return (
    <>
      <AppBarBis></AppBarBis>
      <h1>¿Ya tenés una cuenta? Inicia Sesión</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('user encontrado: ', data.loginUsuario)
          loginUsuario();
        }}
      >
        <TextField
          id="outlined-required"
          label="email"
          value={formState.email}
          onChange={(e) => {
            setFormState({
              ...formState,
              email: e.target.value,
            });
          }}
          type="text"
        />
        <TextField
          id="outlined-required"
          label="password"
          value={formState.password}
          onChange={(e) => {
            setFormState({
              ...formState,
              password: e.target.value,
            });
          }}
          type="text"
        />
        <Button type="submit" variant="contained" color="secondary">
          Hecho
        </Button>
      </form>
    </>
  );
}; 

export default Login;
