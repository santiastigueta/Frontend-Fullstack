import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "@apollo/client";
import { getAllseriesUser } from "../graphql/resolvers/series.resolver";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import ListPage from "../components/SearchBar/ListPage";
import authHeader from "../services/auth-header";
import { UserContext } from "../App";
import jwt from "jwt-decode";
import './home.css';
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  //const [currentUser] = useContext(UserContext); me crea errores sacar el id del context.
  // voy a tener que sacar el _id del usuario del localstorage
  //const user = jwt(currentUser.loginUsuario);
  let user;
  try {
    user = localStorage.getItem("user").slice(17, -2);
    console.log("token del usuario: ", user);
  } catch (error) {
    console.log("No estas logueado")
  }
  
  const verify = jwt(user);
  console.log("id verified: ", verify.userId._id);
  const { loading, error, data } = useQuery(getAllseriesUser, {
    variables: { userId: verify.userId._id },

    onCompleted: (data) => {
      if (data) {
        console.log("mi data: ", data.getAllseriesUser);
        setPosts(data.getAllseriesUser);
        setSearchResults(data.getAllseriesUser);
      }
    },
    fetchPolicy: "network-only",
    context: {
      headers: authHeader()
    }
  });
  if(!user) return <div>No estas logueado...</div>
  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error: </p>;
  console.log("series: ", data.getAllseriesUser);
  return (
    <>
      <div>
        <Link to="/series">
          <Fab color="info" aria-label="add" className="addIcon">
            <AddIcon></AddIcon>
          </Fab>
        </Link>
        <SearchBar posts={posts} setSearchResults={setSearchResults} />
        <ListPage searchResults={searchResults} />
      </div>
    </>
  );
};

export default Home;
