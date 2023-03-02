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
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import authHeader from "../../services/auth-header";
import { selfSerie } from "../../graphql/resolvers/user.resolver";
import userIdFunction from "../../utils/extractUserId";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { DELETE_SERIE_FROM_USER } from "../../graphql/resolvers/series.resolver";
function Options({ serieId, serieName }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [deleteSeriesFromUser] = useMutation(DELETE_SERIE_FROM_USER, {
    variables: {
      serieId: serieId,
      userId: userIdFunction(),
    },
  }); // selfserie nos indica si la serie está o no en su lista (true/false)
  const { loading, error, data } = useQuery(selfSerie, {
    variables: {
      userId: userIdFunction(),
      serieId: serieId,
    },
    onCompleted: (data) => {
      console.log("info: ", data.selfSerie);
    },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const eliminar = () => {
    deleteSeriesFromUser();
    navigate("/home");
  };
  // la serie pertenece a la lista del usuario? si es true se puede eliminar
  const condition = data.selfSerie;
  return (
    <div>
      {condition ? (
        <>
          <Button
            size="small"
            onClick={handleClickOpen}
            variant="contained"
            color="delete"
            startIcon={<PlaylistRemoveIcon />}
          >
            Eliminar de tu lista
          </Button>

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
                Si elimina esta serie, será removida de la base de datos y no
                habrá forma de recuperarla. Presione aceptar para eliminar{" "}
                {serieName}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>cancelar</Button>
              <Button onClick={eliminar}>Eliminar</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : /* Si la serie no pertenece a la lista, no esta disponible la opcion de eliminar de la lista */(
        <></>
      )}
    </div>
  );
}

//<Options idSerie={_id}/>
function SeriesDetailContainer() {
  const navigate = useNavigate();
  const { _id } = useParams();
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
    context: {
      headers: authHeader(),
    },
  });
  // la serie pertenece a la lista del usuario? uso la funcion self_serie para averiguarlo

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
    context: {
      headers: authHeader(),
    },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const serieDetail = data.getSerie;

  console.log("data: ", data);
  const updateThisSeries = () => {
    updateSerie();
    setOpenUpdate(false);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <>
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
          <cardAction className="options">
            <Button
              size="small"
              variant="contained"
              startIcon={<EditIcon />}
              color="info"
              onClick={updateOpen}
              className="editButton"
            >
              Editar
            </Button>
            <Options serieId={_id} serieName={serieDetail.name}></Options>
          </cardAction>
          <cardAction className="volver-button">
            <Button
              variant="contained"
              color="secondary"
              onClick={navigateBack}
            >
              Volver
            </Button>
          </cardAction>
        </Card>

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
                  helperText="Nombre de la serie"
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
    </>
  );
}

export default SeriesDetailContainer;
