import { useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { getAllSeries } from "../../graphql/resolvers/series.resolver";
import SearchBar from "../../components/SearchBar/SearchBar";
import authHeader from "../../services/auth-header";
import ListPageCatalogo from "./ListPageCatalogo";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReplyIcon from '@mui/icons-material/Reply';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from "react-router-dom";
import Fab from "@mui/material/Fab";
import './seriesCatalogo.css';
const SeriesCatalogo = () => {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    //const [currentUser] = useContext(UserContext); me crea errores sacar el id del context.
    // voy a tener que sacar el _id del usuario del localstorage
    //const user = jwt(currentUser.loginUsuario);
    
    const { loading, error, data } = useQuery(getAllSeries, {
      onCompleted: (data) => {
        if (data) {
          console.log("mi data: ", data.getAllSeries);
          setPosts(data.getAllSeries);
          setSearchResults(data.getAllSeries);
        }
      },
      fetchPolicy: "network-only",
      context: {
        headers: authHeader()
      }
    });
    let user;
    try {
      user = localStorage.getItem("user")
    } catch (error) {
      return <div>No estas logueado</div>
    }
    if(!user) return <div>No estas logueado...</div>
    if (loading) return <p> Loading... </p>;
    if (error) return <p> Error: </p>;
    console.log("series: ", data.getAllSeries);
    return (
      <>
        <div>
          {/* <Button variant="contained" onClick={function(){navigate(-1)}}>Volver</Button> */}
          <section>
            <Link to="/home">
              <Fab color='info' aria-label="add" className="volver">
                <ReplyIcon ></ReplyIcon>
              </Fab>
            </Link>
            <Link to="/create">
              <Fab color='info' aria-label="add" className="create">
                <CreateIcon></CreateIcon>
              </Fab>
            </Link>
          </section>
          <SearchBar posts={posts} setSearchResults={setSearchResults} />
          <ListPageCatalogo searchResults={searchResults} />
        </div>
      </>
    );
};

export default SeriesCatalogo;
