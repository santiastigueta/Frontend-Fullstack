import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// CSS
import './App.css';

// resolvers
//import DisplayAllSeries from './components/SeriesCard/SeriesCard.js';

// COMPONENTES
import MiAppBar from './components/NavBar/NavBar';


// Vistas
import home from './views/home';
import Crear from './components/CreateSerie/create';
import SeriesDetailContainer from './views/SeriesDetail/SeriesDetailContainer';

function App() {
  return (
    <Router>
      <div className="App">
        <MiAppBar/>
        <br/>
        <Switch>
          <Route path="/" exact component={home}></Route>
          <Route path="/create" component={Crear}></Route>
          <Route path="/serie/:_id" component={SeriesDetailContainer}></Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
