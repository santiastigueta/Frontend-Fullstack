import React, { useState } from "react";
import "./create.css";
import { CREATE_SERIE } from "../../graphql/resolvers/series.resolver";
import { useMutation } from "@apollo/client";
import {  useNavigate } from "react-router-dom";
import { Autocomplete, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import years  from "../../utils/years";
import score from "../../utils/score";
import genders from "../../utils/genders";
import userIdFunction from "../../utils/extractUserId";
import authHeader from "../../services/auth-header";
const Crear = () => {
  const navigate = useNavigate();
  
  const [generoInputValue, setGeneroInputValue] = useState('');
  const [yearInputValue, setYearInputValue] = useState('');
  const [scoreInputValue, setScoreInputValue] = useState('')

  const [formState, setFormState] = useState({
    nombre: "",
    autor: "",
    estrellas: "",
    fechaLanzamiento: "",
    image: "",
    gender: "",
  });
  
  const idSerie = userIdFunction();

  const [createSerie, {loading, data, error}] = useMutation(CREATE_SERIE, {
    variables: {
      userId: idSerie,
      nombre: formState.nombre,
      autor: formState.autor,
      estrellas: formState.estrellas,
      fechaLanzamiento: formState.fechaLanzamiento,
      image: formState.image,
      gender: formState.gender,
    },
    context: {
      headers: authHeader()
    }
  });
  const createThisSeries = () => {
    createSerie();
  };
  return (
    <>
      <body className="CreateComponent">
      <div className="Formulario">
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
              className="mb2"
              value={formState.nombre}
              helperText="Nombre de la serie"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  nombre: e.target.value,
                })
              }
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="Autor"
              variant="outlined"
              className="mb2"
              value={formState.autor}
              helperText="Indique el autor de la serie"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  autor: e.target.value,
                })
              }
              type="text"
            />
            <Autocomplete
              className="mb2"
              value={formState.estrellas}
              onInputChange={(e, newValue)=>{
                setScoreInputValue(newValue)
              }}
              inputValue={scoreInputValue}
              onChange={(event, newValue)=>{
                setFormState({
                  ...formState,
                  estrellas: newValue
                })
              }}
              id='rate-autocomplete'
              options={score}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Puntuación" />}
            />
            <Autocomplete
            className="mb2"
              value={formState.fechaLanzamiento}
              onInputChange={(event, newValue)=>{
                setYearInputValue(newValue)
              }} 
              inputValue={yearInputValue}
              onChange={(event, newValue)=>{
                setFormState({
                  ...formState,
                  fechaLanzamiento: newValue
                })
              }}
              id='year-autocomplete'
              options={years}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Año de estreno" />}
            />
            <TextField
              id="outlined-basic"
              label="Imagen"
              variant="outlined"
              className="mb2"
              value={formState.image}
              helperText="Url de la imagen"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  image: e.target.value,
                })
              }
              type="text"
            />
            <Autocomplete
              value={formState.gender}
              onChange={(event, newValue)=>{
                setFormState({
                  ...formState,
                  gender: newValue
                })
              }}
              inputValue={generoInputValue}
              onInputChange={(event, newInputValue)=>{
                setGeneroInputValue(newInputValue)
              }}
              className="mb2"
              id="gender-autocomplete"
              options={genders}
              sx={{width: 300}}
              renderInput={(params) => <TextField {...params} label="Género" />}
            />
          </div>
          <Button type="submit" variant="contained" color="info">
            Hecho
          </Button>
          <Button primary onClick={navigate("/home")} color='info'>
            Volver
          </Button>
        </form>
      </div>
      <div className="imageContainer">
        <img src='juego-tronos-poster.jpg' alt="" className='imageDragon'/>
      </div>
    </body>
    </>
    
  );
};

export default Crear;
