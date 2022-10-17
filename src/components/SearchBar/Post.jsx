import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useHistory } from "react-router-dom";


const Post = ({ post }) => {
    const history = useHistory();
  return (
    <Card className="Card" style={{paddingBottom: "15px", minHeight: "100x"}} sx={{ maxWidth: 345 }}>
      <CardActionArea  >
        <CardMedia
          component="img"
          height="140"
          image={post.image}
          alt="imagen-serie"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {" "}
            {post.name}{" "}
          </Typography>{" "}
          <Typography variant="body2" color="text.secondary" style={{minHeight: "50px"}}>
            Esta serie fue creada por {post.author} en el año {post.releaseDate}{" "}
          </Typography>{" "}
        </CardContent>{" "}
      </CardActionArea>{" "}
      <CardActions>
        <Button size="small" color="info">
          género: {post.gender}{" "}
        </Button>{" "}
      </CardActions>{" "}
      <Button
        variant="contained"
        color="secondary"
        onClick={function () {
          history.push(`/serie/${post._id}`);
        }}
      >
        Ver mas detalles{" "}
      </Button>{" "}
    </Card>
  );
};
export default Post;
