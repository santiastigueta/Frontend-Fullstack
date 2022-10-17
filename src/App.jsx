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

// estilos
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, purple, indigo, amber, yellow, red, blue } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: yellow[600],
    },
    info:{
      main: '#000'
    }
  },
});

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
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}
export default App;
