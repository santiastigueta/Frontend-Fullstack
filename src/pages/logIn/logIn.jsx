import React from 'react'
import AppBarBis from '../../components/NavBarBis/NavBarBis';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { LOGIN_USUARIO } from '../../graphql/resolvers/user.resolver';
import { useQuery } from '@apollo/client';

const logIn = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const {error, loading, data} = useQuery(LOGIN_USUARIO, {
    variables: {
      email: formState.email,
      password: formState.password
    }
  });
  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error: </p>;
  
  return (
    <>
      <AppBarBis></AppBarBis>
      <h1>¿Ya tenés una cuenta? Inicia Sesión</h1>
      <form
        onSubmit={(e)=>{
          e.preventDefault();
          // funcion del resolver
          console.log('usuario encontrado: ', e)
        }}>
        <TextField
          id="outlined-required"
          label="email"
        />
        <TextField
          id="outlined-required"
          label="password"
        />
        <Button type='submit'  variant="contained" color="secondary" >Hecho</Button>
      </form>
    </>
    
  )
}

export default logIn;