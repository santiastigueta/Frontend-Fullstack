import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// CSS
import "./App.css";

// resolvers
//import DisplayAllSeries from './components/SeriesCard/SeriesCard.js';

// COMPONENTES
import MiAppBar from "./components/NavBar/NavBar";

// Vistas
import Home from "./views/Home";
import Crear from "./components/CreateSerie/create";
import SeriesDetailContainer from "./views/SeriesDetail/SeriesDetailContainer";
import Filter from "./views/Filter";
// estilos
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from './utils/darkTheme';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="App">
          <MiAppBar />
          <br />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/create" component={Crear}></Route>
            <Route path="/serie/:_id" component={SeriesDetailContainer}></Route>
            <Route path="/filter" component={Filter}></Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}
export default App;
