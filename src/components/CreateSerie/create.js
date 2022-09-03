import React, { useState } from 'react';
import { CREATE_SERIE } from '../../graphql/resolvers/series.resolver';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
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
    image: ''
  });

  const [createSerie] = useMutation(CREATE_SERIE, {
    variables: {
      nombre: formState.nombre,
      autor: formState.autor,
      estrellas: formState.rating,
      fechaLanzamiento: formState.fechaLanzamiento,
      image: formState.image
    }
  });

  return (
    <div>
      <h1>Añada una serie nueva!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createSerie();
        }}
      >
        <div classnombre="flex flex-column mt3">
          <input
            classnombre="mb2"
            value={formState.nombre}
            onChange={(e) =>
              setFormState({
                ...formState,
                nombre: e.target.value
              })
            }
            type="text"
            placeholder="Indique nombre de la serie"
          />
          <input
            classnombre="mb2"
            value={formState.autor}
            onChange={(e) =>
              setFormState({
                ...formState,
                autor: e.target.value
              })
            }
            type="text"
            placeholder="Autor de la serie"
          />
          <input
            classnombre="mb2"
            value={formState.estrellas}
            onChange={(e) =>
              setFormState({
                ...formState,
                estrellas: e.target.value
              })
            }
            type="number"
            placeholder="¿Qué puntuacion tiene?"
          />
          <input
            classnombre="mb2"
            value={formState.fechaLanzamiento}
            onChange={(e) =>
              setFormState({
                ...formState,
                fechaLanzamiento: e.target.value
              })
            }
            type="text"
            placeholder="Año de lanzamiento"
          />
          <input
            classnombre="mb2"
            value={formState.image}
            onChange={(e) =>
              setFormState({
                ...formState,
                image: e.target.value
              })
            }
            type="text"
            placeholder="pegue dirección de imagen"
          />
        </div>
        <Button type='submit' variant="contained">Hecho</Button>
        <Button primary onClick={backToMenu}>Volver</Button>
      </form>
    </div>
  );
};

export default Crear;