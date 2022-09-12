import React, { useState } from 'react';
import './create.css';
import { CREATE_SERIE } from '../../graphql/resolvers/series.resolver';

import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
const Crear = () => {
  const history = useHistory();
  const backToMenu = () => {
    history.push('/')
  }
  const [formState, setFormState] = useState({
    nombre: '',
    autor: '',
    estrellas: '',
    fechaLanzamiento: '',
    image: '',
    gender: ''
  });

  const [createSerie] = useMutation(CREATE_SERIE, {
    variables: {
      nombre: formState.nombre,
      autor: formState.autor,
      estrellas: formState.estrellas,
      fechaLanzamiento: formState.fechaLanzamiento,
      image: formState.image,
      gender: formState.gender
    }
  });

  const createThisSeries = () => {
    createSerie();
    history.push('/');
    window.location.reload(false);
  }
  return (
    <div>
      <h1>Añada una serie nueva!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createThisSeries();
        }}
      >
        <div className="form">
          <TextField 
            id="outlined-basic" 
            label="Nombre" 
            variant="outlined"
            classnombre="mb2"
            value={formState.nombre}
            helperText="Nombre de la serie"
            onChange={(e) =>
              setFormState({
                ...formState,
                nombre: e.target.value
              })
            }
            type="text"
            />
          <TextField 
            id="outlined-basic" 
            label="Autor" 
            variant="outlined"
            classnombre="mb2"
            value={formState.autor}
            helperText="Indique el autor de la serie"
            onChange={(e) =>
              setFormState({
                ...formState,
                autor: e.target.value
              })
            }
            type="text"
            />
          <TextField 
            id="outlined-basic" 
            label="Puntuacion" 
            variant="outlined"
            classnombre="mb2"
            value={formState.estrellas}
            helperText="Puntuación de IMDb"
            onChange={(e) =>
              setFormState({
                ...formState,
                estrellas: e.target.value
              })
            }
            type="text"
            />
          <TextField 
            id="outlined-basic" 
            label="Año" 
            variant="outlined"
            classnombre="mb2"
            value={formState.fechaLanzamiento}
            helperText="¿En qué año se estrenó?"
            onChange={(e) =>
              setFormState({
                ...formState,
                fechaLanzamiento: e.target.value
              })
            }
            type="text"
            />
          
          <TextField 
            id="outlined-basic" 
            label="Imagen" 
            variant="outlined"
            classnombre="mb2"
            value={formState.image}
            helperText="Pegue la direaccion de imagen"
            onChange={(e) =>
              setFormState({
                ...formState,
                image: e.target.value
              })
            }
            type="text"
            />
            <TextField 
            id="outlined-basic" 
            label="género" 
            variant="outlined"
            classnombre="mb2"
            value={formState.gender}
            helperText="Género de la serie"
            onChange={(e) =>
              setFormState({
                ...formState,
                gender: e.target.value
              })
            }
            type="text"
            />
        </div>
        <Button type='submit' variant="contained">Hecho</Button>
        <Button primary onClick={backToMenu}>Volver</Button>
      </form>
    </div>
  );
};

export default Crear;