import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './SeriesDetail.css';
import { useQuery, useMutation} from "@apollo/client";
import { getSerie } from "../../graphql/resolvers/series.resolver";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_SERIE } from '../../graphql/resolvers/series.resolver';
import { useLocation, useParams, useHistory } from 'react-router-dom';

function SeriesDetailContainer() {
  const {_id} = useParams();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  
  const handleClickOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };

    // Query: 
  const { loading, error, data } = useQuery(getSerie, {
    variables: {
      idSerie: _id
    }
  });
  // Mutation
  const [deleteSeries] = useMutation(DELETE_SERIE, {
    variables: {
      idSerie: _id
    }
  })

  if (loading) return null;
  if (error) return `Error! ${error}`;
  const serieDetail = data.getSerie;

  
  const eliminar =() => {
    deleteSeries();
    history.push('/');
    window.location.reload(false);
  }
  
  
  return(
    <div className='SeriesDetailContainer'>
      <Card sx={{ maxWidth:500 }}>
        <CardMedia
          component="img"
          alt="serie-imagen"
          height="140"
          image={serieDetail.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {serieDetail.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta serie fue creada por {serieDetail.author} en el año {serieDetail.releaseDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color='primary'>Editar</Button>
          <Button size="small" onClick={handleClickOpen} variant='outlined' color='error'  startIcon={<DeleteIcon />}>Eliminar</Button>
        </CardActions>
      </Card>
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
        {"Estás seguro de eliminar esta serie?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Si elimina esta serie, será removida de la base de datos y no habrá forma de recuperarla. Presione aceptar para eliminar {serieDetail.name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancelar</Button>
        <Button onClick={eliminar} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}
export default SeriesDetailContainer;