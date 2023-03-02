import React, { useState, useContext} from "react";
import AppBarBis from "../../components/NavBarBis/NavBarBis";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { LOGIN_USUARIO } from "../../graphql/resolvers/user.resolver";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { ConstructionOutlined } from "@mui/icons-material";


const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  }); 
  const [loginUsuario] = useMutation(LOGIN_USUARIO, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: (data) => {
      if(data.loginUsuario){
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/home");
        window.location.reload();
      }else{
        console.log('Usuario o contraseña Incorrectos.')
      }
    }
  });
   return (
    <>
      <h1>¿Ya tenés una cuenta? Inicia Sesión</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
