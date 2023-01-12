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
  const [user, setUser] = useState({});
  const [loadingApp, setLoadingApp] = useState(true)
  const history = useHistory();

  const [logOut] = useMutation(LOGOUT, {
    onCompleted: () => {
      setUser({});
    }
  });

  const logOutCallBack = async () => {
    logOut();
    history.push('/')
  };

 /*  const [sendRefreshToken, {data, loading, error}] = useMutation(SEND_REFRESHTOKEN, {
    onCompleted: (data) => {
      setLoadingApp(false)
      console.log("sendrefreshdata: ", data)
      setUser({
        accesstoken: data.sendRefreshToken
      });
    }
  });

  useEffect(() => {
    sendRefreshToken();
  }, []);

  if(loadingApp) return <div>loading...</div> */

  return (
    <UserContext.Provider value={[user, setUser]}>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <Router>
          <NavBarBis logOutCallBack={logOutCallBack}></NavBarBis>
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
