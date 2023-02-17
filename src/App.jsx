
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

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
import SeriesCatalogo from "./views/seriesCatalogo/seriesCatalogo";
// estilos
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./utils/darkTheme";

//pages
import Login from "./pages/logIn/logIn";
import Register from "./pages/register/register";
import { useMutation } from "@apollo/client";
import { LOGOUT, SEND_REFRESHTOKEN } from "./graphql/resolvers/user.resolver";

export const UserContext = React.createContext([]);

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const getCurrentUser = () => {
    //considerar guardar estas funciones en services
    return JSON.parse(localStorage.getItem("user"));
  };
  const [logOut] = useMutation(
    LOGOUT , {
    onCompleted: (data) => {
      localStorage.removeItem("user");
      window.location.reload();
    }
  } 
  );

  // SIGUIENTE PASO: HACER FUNCIONAR EL CREATE SERIE SEGUN USUARIO. 

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    console.log("current user: ", user);
  }, []);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <Router>
            <NavBarBis logout={logOut}></NavBarBis>
            <Routes>
              <Route path="/" exact element={<Inicio/>}></Route>
              <Route path="/home" element={<Home/>}></Route>
              <Route path="/create" element={<Crear/>}></Route>
              <Route path='/series' element={<SeriesCatalogo/>}></Route> {/* catalogo de series */}
              <Route
                path="/serie/:_id"
                element={<SeriesDetailContainer/>}
              ></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  );
}
export default App;
