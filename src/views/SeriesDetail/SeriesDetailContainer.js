import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


import { useQuery } from "@apollo/client";
import { getSerie } from "../../graphql/resolvers/series.resolver";
import { useLocation, useParams } from 'react-router-dom';
function SeriesDetailContainer() {
    const {_id} = useParams();

    //let chardID = match.params.id;
    console.log(_id)
    /* return(
        <div>
            <h3>IDSERIE: {idSerie}</h3>
        </div>
    ) */ 
    //const useQuery = () => new URLSearchParams(useLocation().search);
    const { loading, error, data } = useQuery(getSerie, {
        variables: {
            idSerie: _id
        }
    });

  if (loading) return null;
  if (error) return `Error! ${error}`;
  
  console.log('esta es la data de miSerieDetail: ', data.getSerie);
    return(
        <p>{JSON.stringify(data)}</p>
    )

}

export default SeriesDetailContainer;