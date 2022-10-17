import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";
import { Button, TextField } from "@mui/material";
const SearchBar = ({ posts, setSearchResults }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(posts);
    const resultsArray = posts.filter((post) =>
      post.name_lower.includes(e.target.value.toLowerCase().trim())
    );
    setSearchResults(resultsArray);
  };
  return (
    <header>
      <form className="search" onSubmit={handleSubmit} autocomplete="off">
        <TextField
          type="text"
          className="searchIinput"
          label="Búsqueda"
          id="search"
          onChange={handleSearchChange}
        ></TextField>
        <Button color="info" variant="contained" className="searchButton">
          <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon' size="large"/>
        </Button>
      </form>
    </header>
  );
};

export default SearchBar;
