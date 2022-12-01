import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { REGISTER_USUARIO } from "../../graphql/resolvers/user.resolver";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Register = () => {
    const [formState, setFormState] = useState({
        email: "",
        username: "", 
        password: ""
    });
    
    const [registerUsuario] = useMutation(REGISTER_USUARIO, {
        variables:{
            email: formState.email,
            username: formState.username,
            password: formState.password
        }
    })

    const createUser = () => {
        console.log('usuario creado: ',formState)
        registerUsuario();
    }

  return (
    <div className="register">
        <h1>Registrarse</h1>
      <form
        onSubmit={(e)=>{
            e.preventDefault();
            createUser();
        }}
      >
        <TextField
          id="outlined-required"
          label="username"
          value={formState.username}
          onChange={(e)=>{
            setFormState({
                ...formState,
                username: e.target.value
            })
          }}
        />
        <TextField
          id="outlined-required"
          label="e-mail"
          value={formState.email}
          onChange={(e)=>{
            setFormState({
                ...formState,
                email: e.target.value
            })
          }}
        />
         <TextField
          id="outlined-password-input"
          label="Password"
          value={formState.password}
          type="password"
          onChange={(e)=>{
            setFormState({
                ...formState,
                password: e.target.value
            })
          }}
        />
        <Button type="submit" variant="contained" color="info">
            Hecho
        </Button>
        
      </form>
      <Button component={Link} to="/" variant="contained" color="secondary">
          volver
      </Button>
    </div>
  );
};

export default Register;
