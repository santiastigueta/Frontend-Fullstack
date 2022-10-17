import React from "react";
import { Link } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "@apollo/client";
import { getAllSeries } from "../graphql/resolvers/series.resolver";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import ListPage from "../components/SearchBar/ListPage";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const { loading, error, data } = useQuery(getAllSeries, {
    onCompleted: (data) =>{
      if(data){
        setPosts(data.getAllSeries)
        setSearchResults(data.getAllSeries)
      }
    },
    fetchPolicy: 'network-only'
  });
  
  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error: </p>;
  return (
    <div>
      <Link to="/create">
        <Fab color="info" aria-label="add">
          <AddIcon  className="addIcon"></AddIcon>
        </Fab>
      </Link>
      <SearchBar posts={posts} setSearchResults={setSearchResults}/>
      <ListPage searchResults={searchResults} />
      {/* <SeriesCardContainer></SeriesCardContainer> */}
    </div>
  );
};

export default Home;
