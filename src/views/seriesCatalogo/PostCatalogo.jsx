import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ASIGNAR_SERIE_USUARIO } from "../../graphql/resolvers/user.resolver";
import { useMutation } from "@apollo/client";
import jwt from "jwt-decode";
import authHeader from "../../services/auth-header";

const PostCatalogo = ({ post }) => {
  const navigate = useNavigate();
  let userToken;
  try {
    // conseguir el token del usuario logueado
    userToken = localStorage.getItem("user").slice(17, -2);
  } catch (error) {
    console.log("No estas logueado");
  }
  const data = jwt(userToken); //decifrar el id del usuario

  const [asignarSerieUser] = useMutation(ASIGNAR_SERIE_USUARIO, {
    variables: {
      userId: data.userId._id,
      serieId: post._id,
    },
    fetchPolicy: "network-only",
    onCompleted: ()=>{
      navigate(-1);
    },
    context: {
      headers: authHeader()
    }
  });
  
  /* const miFuncion = () => {
    console.log("userId: ", data.userId._id);
    console.log("serieId: ", post._id)
  }; */ 
  return (
    <Card
      className="Card"
      style={{ paddingBottom: "15px", minHeight: "100x" }}
      sx={{ maxWidth: 345 }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={post.image}
          alt="imagen-serie"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {" "}
            {post.name}{" "}
          </Typography>{" "}
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ minHeight: "50px" }}
          >
            Esta serie fue creada por {post.author} en el año {post.releaseDate}{" "}
          </Typography>{" "}
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Puntuación de imdb: {post.rating}{" "}
          </Typography>{" "}
        </CardContent>{" "}
      </CardActionArea>{" "}
      <CardActions>
        <Button size="small" color="info">
          género: {post.gender}{" "}
        </Button>{" "}
      </CardActions>{" "}
      {/* <Button
        variant="contained"
        color="secondary"
        onClick={function () {
          navigate(`/serie/${post._id}`);
        }}
      >
        Ver mas detalles{" "}
      </Button>{" "} */}
      <Button variant="contained" color="primary" onClick={asignarSerieUser}>
        Agregar
      </Button>
    </Card>
  );
};
export default PostCatalogo;
