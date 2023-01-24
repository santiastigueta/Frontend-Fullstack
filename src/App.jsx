import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

// CSS
import "./App.css";

// COMPONENTES
import MiAppBar from "./components/NavBar/NavBar";
import NavBarBis from "./components/NavBarBis/NavBarBis";
// Vistas
import Inicio from "./views/inicio/inicio";
import Home from "./views/Home";
import Crear from "./components/CreateSerie/create";
import SeriesDetailContainer from "./views/SeriesDetail/SeriesDetailContainer";

// estilos
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./utils/darkTheme";

//pages
import logIn from "./pages/logIn/logIn";
import Register from "./pages/register/register";
import { useMutation } from "@apollo/client";
import { LOGOUT, SEND_REFRESHTOKEN } from "./graphql/resolvers/user.resolver";

export const UserContext = React.createContext([]);

function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const getCurrentUser = () => {//considerar guardar estas funciones en services
    return JSON.parse(localStorage.getItem("user"));
  };
  const logout = () => {//considerar guardar estas funciones en services
    localStorage.removeItem("user");
  };
  useEffect(() => {
    const user = getCurrentUser();
    if(user) {
      setCurrentUser(user)
    }
  }, []) 

  
  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <Router>
          <NavBarBis logout={logout}></NavBarBis>
            <Switch>
              <Route path="/" exact component={Inicio}></Route>
              <Route path="/home" component={Home}></Route>
              <Route path="/create" component={Crear}></Route>
              <Route
                path="/serie/:_id"
                component={SeriesDetailContainer}
              ></Route>
              <Route path="/login" component={logIn}></Route>
              <Route path="/register" component={Register}></Route>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
export default App;
