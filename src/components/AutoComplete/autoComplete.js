import { useQuery } from '@apollo/client';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllSeries } from '../../graphql/resolvers/series.resolver';

function Buscador() {
  const { loading, error, data } = useQuery(getAllSeries);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
 
  const series = data.getAllSeries
  const listSeries = series.map((serie) => {
    return serie.name
  })
  function setLabel(item){
    const fullname = item;
    return fullname;
  }
  const output = listSeries.map(setLabel)
  console.log("Este es el listSeries! ",output);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={output}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Buscar..." />}
    />
  );
}

export default Buscador;