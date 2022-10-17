import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./SeriesDetail.css";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import {
  getSerie,
  UPDATE_SERIE,
} from "../../graphql/resolvers/series.resolver";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_SERIE } from "../../graphql/resolvers/series.resolver";
import { useLocation, useParams, useHistory, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
function SeriesDetailContainer() {
  const { _id } = useParams();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [formState, setFormState] = useState({
    _id: "",
    name: "",
    author: "",
    rating: "",
    releaseDate: "",
    image: "",
    gender: "",
  });
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const updateOpen = () => {
    setOpenUpdate(true);
  };
  const updateClose = () => {
    setOpenUpdate(false);
  };

  const { loading, error, data } = useQuery(getSerie, {
    variables: {
      idSerie: _id,
    },
    onCompleted: (data) => {
      if (data) {
        setFormState({ ...data.getSerie });
      }
    },
  });

  // Mutation
  const [deleteSeries] = useMutation(DELETE_SERIE, {
    variables: {
      idSerie: _id,
    },
  });

  const [updateSerie] = useMutation(UPDATE_SERIE, {
    variables: {
      idSerie: _id,
      nombre: formState.name,
      autor: formState.author,
      estrellas: formState.rating,
      fechaLanzamiento: formState.releaseDate,
      image: formState.image,
      gender: formState.gender,
    },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const serieDetail = data.getSerie;

  const eliminar = () => {
    deleteSeries();
    history.push("/");
  };

  const updateThisSeries = () => {
    updateSerie();
    setOpenUpdate(false);
  };

  return (
    <div className="SeriesDetailContainer">
      <Card sx={{ maxWidth: 500 }}>
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
            Fue creada por {serieDetail.author} en el año{" "}
            {serieDetail.releaseDate}. Esta serie es del género{" "}
            {serieDetail.gender}
          </Typography>
        </CardContent>
        <cardAction>
          <Typography variant="body3" color="text.primary">
            ImDb Score: {serieDetail.rating}
          </Typography>
        </cardAction>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            startIcon={<EditIcon />}
            color="info"
            onClick={updateOpen}
          >
            Editar
          </Button>
          <Button
            size="small"
            onClick={handleClickOpen}
            variant="contained"
            color="info"
            startIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
        </CardActions>
        <cardAction className="volver-button">
          <Button variant="contained" color="secondary" component={Link} to="/">
            Volver
          </Button>
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
            Si elimina esta serie, será removida de la base de datos y no habrá
            forma de recuperarla. Presione aceptar para eliminar{" "}
            {serieDetail.name}
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
        className="editDialog"
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
            <div className="formEdit">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                classnombre="mb2"
                value={formState.name}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    name: e.target.value,
                    //formState: {...formState,nombre: e.target.value}
                  })
                }
                type="text"
              />
              <TextField
                id="outlined-basic"
                label="Autor"
                variant="outlined"
                classnombre="mb2"
                value={formState.author}
                helperText="Indique el autor de la serie"
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    author: e.target.value,
                  })
                }
                type="text"
              />
              <TextField
                id="outlined-basic"
                label="Genero"
                variant="outlined"
                classnombre="mb2"
                value={formState.gender}
                helperText="Indique el genero de la serie"
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    gender: e.target.value,
                  })
                }
                type="text"
              />
              <TextField
                id="outlined-basic"
                label="Puntuacion"
                variant="outlined"
                classnombre="mb2"
                value={formState.rating}
                helperText="Toda serie tiene puntuacion"
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    rating: e.target.value,
                  })
                }
                type="text"
              />
              <TextField
                id="outlined-basic"
                label="Año"
                variant="outlined"
                classnombre="mb2"
                value={formState.releaseDate}
                helperText="¿En qué año se estrenó?"
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    releaseDate: e.target.value,
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
                    image: e.target.value,
                  })
                }
                type="text"
              />
            </div>
            <Button type="submit" variant="contained">
              Hecho
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={updateClose}>cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SeriesDetailContainer;
