import { getAllSeries } from "../../graphql/resolvers/series.resolver";
import "./seriesCard.css";
import { useQuery } from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function DisplayAllSeries() {
  const history = useHistory();
  
    const { loading, error, data } = useQuery(getAllSeries, {
        fetchPolicy: 'network-only'
    });
    console.log(error)
    if (loading) return <p> Loading... </p>;
    if (error) return <p> Error: </p>;
    console.log("este es el data: ", data);
  
  const serie = Object.values(data.getAllSeries);
  console.log("mapeo de series: ", serie);

  return serie.map(({ _id, name, author, gender, releaseDate, image }) => (
    <Card className="Card" sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="imagen-serie"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {" "}
            {name}{" "}
          </Typography>{" "}
          <Typography variant="body2" color="text.secondary">
            Esta serie fue creada por {author} en el año {releaseDate}{" "}
          </Typography>{" "}
        </CardContent>{" "}
      </CardActionArea>{" "}
      <CardActions>
        <Button size="small" color="primary">
          género: {gender}{" "}
        </Button>{" "}
      </CardActions>{" "}
      <Button
        variant="contained"
        onClick={function () {
          history.push(`/serie/${_id}`);
        }}
      >
        Ver mas detalles{" "}
      </Button>{" "}
    </Card>
  ));
}

export default DisplayAllSeries;
