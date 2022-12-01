import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// CSS
import "./App.css";

// resolvers
//import DisplayAllSeries from './components/SeriesCard/SeriesCard.js';

// COMPONENTES
import MiAppBar from "./components/NavBar/NavBar";

// Vistas
import Inicio from "./views/inicio/inicio";
import Home from "./views/Home";
import Crear from "./components/CreateSerie/create";
import SeriesDetailContainer from "./views/SeriesDetail/SeriesDetailContainer";

// estilos
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from './utils/darkTheme';

//pages
import logIn from "./pages/logIn/logIn";
import Register from "./pages/register/register";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Inicio} ></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/create" component={Crear}></Route>
            <Route path="/serie/:_id" component={SeriesDetailContainer}></Route>
            <Route path="/log-in" component={logIn}></Route>
            <Route path="/register" component={Register}></Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}
export default App;

/* /home
  /log-in
  /register
  /home
 */