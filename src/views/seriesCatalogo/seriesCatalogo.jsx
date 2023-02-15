import { useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { getAllSeries } from "../../graphql/resolvers/series.resolver";
import SearchBar from "../../components/SearchBar/SearchBar";
import authHeader from "../../services/auth-header";
import ListPageCatalogo from "./ListPageCatalogo";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SeriesCatalogo = () => {
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    //const [currentUser] = useContext(UserContext); me crea errores sacar el id del context.
    // voy a tener que sacar el _id del usuario del localstorage
    //const user = jwt(currentUser.loginUsuario);
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(getAllSeries, {
      onCompleted: (data) => {
        authHeader();
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
          <Button variant="contained" onClick={function(){navigate(-1)}}>Volver</Button>
          <SearchBar posts={posts} setSearchResults={setSearchResults} />
          <ListPageCatalogo searchResults={searchResults} />
        </div>
      </>
    );
};

export default SeriesCatalogo;
