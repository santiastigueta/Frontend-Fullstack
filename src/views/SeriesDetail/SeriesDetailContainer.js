import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './SeriesDetail.css';
import { useQuery, useMutation} from "@apollo/client";
import { getSerie, UPDATE_SERIE } from "../../graphql/resolvers/series.resolver";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_SERIE } from '../../graphql/resolvers/series.resolver';
import { useLocation, useParams, useHistory, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
;

function SeriesDetailContainer() {
  const {_id} = useParams();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [formState, setFormState] =useState({
    nombre: '',
    autor: '',
    estrellas: '',
    fechaLanzamiento: '',
    image: '',
    gender: ''
  })
  const history = useHistory();
  
  const handleClickOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const updateOpen = () =>{
    setOpenUpdate(true);
  };
  const updateClose = () => {
    setOpenUpdate(false)
  }

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
  
  const [updateSerie] = useMutation(UPDATE_SERIE, {
    variables: {
      idSerie: _id,
      nombre: formState.nombre,
      autor: formState.autor,
      estrellas: formState.estrellas,
      fechaLanzamiento: formState.fechaLanzamiento,
      image: formState.image,
      gender: formState.gender
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
  
  const updateThisSeries = () => {
    updateSerie();
    setOpenUpdate(false)
    
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
            Fue creada por {serieDetail.author} en el año {serieDetail.releaseDate}. Esta serie es del género {serieDetail.gender}
          </Typography>
        </CardContent>
        <cardAction>
          <Typography variant="body3" color="text.primary">
            ImDb Score: {serieDetail.rating}
          </Typography>
        </cardAction>
        <CardActions>
          <Button  color='primary' onClick={updateOpen}>Editar</Button>
          <Button size="small" onClick={handleClickOpen} variant='outlined' color='error'  startIcon={<DeleteIcon />}>Eliminar</Button>
        </CardActions>
        <cardAction className="volver-button">
          <Button variant="contained" color='primary' component={Link} to="/" >Volver</Button>
        </cardAction>
      </Card>

      {/* Eliminar */}
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

    {/* Update */}
    <Dialog
      open={openUpdate}
      onClose={updateClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
        ¿{serieDetail.name} necesita cambios?
      </DialogTitle>
      <DialogContent>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateThisSeries();
        }}
      >
        <div className="form">
          <TextField 
            id="outlined-basic" 
            label="Name" 
            variant="outlined"
            classnombre="mb2"
            value={formState.nombre}
            helperText="cambie el nombre de la serie"
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
            helperText="Toda serie tiene puntuacion"
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
        </div>
        <Button type='submit' variant="contained">Hecho</Button>
      </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={updateClose}>Atrás</Button>
      </DialogActions>
    </Dialog> 
    </div>
  );
};

export default SeriesDetailContainer;