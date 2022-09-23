import { useQuery } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {getSerieBusqueda } from '../../graphql/resolvers/series.resolver';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import BusquedaSeries from '../BusquedaSeries/busquedaSeries';
import '../AutoComplete/autoComplete.css';
import Search from './../../views/Search/Search';

function Buscador() {
  const history = useHistory();
  const backToMenu = () => {
    history.push('/search')
  }
  const [inputValue, setInputValue] = useState('')
  const { loading, error, data } = useQuery(getSerieBusqueda);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
 
  const series = data.getSerieBusqueda;
  
  const listSeries = series.map((serie) => {
    return serie.name
  })
  function setLabel(item){
    const fullname = item;
    return fullname;
  }
  const output = listSeries.map(setLabel);
  
  console.log("Este es el listSeries! ",output);
  console.log('este es el inputvalue: ', inputValue);
  return (
    <>
      <form 
      onSubmit={(e) =>{
      e.preventDefault();
      //backToMenu();}
      
      }}>
        <div className='form'>
        <Autocomplete
        disablePortal
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="combo-box-demo"
        options={output}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Buscar..." />}
        />
        </div>
      </form>
      <div className='listadoSeries'>
        <BusquedaSeries info={inputValue}></BusquedaSeries>
      </div>
    </>
  );
}

export default Buscador;