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
// paso 1: hacer el navbar y pensar en las vistas
// paso 2: hacer las vistas y SPA si es posible xd
//  ¿que vistas hacemos? /Home, /:SerieDetail, y Agregar

function App() {
  return (
    <Router>
      <div className="App">
        <MiAppBar/>
        <br/>
        <Switch>
          <Route path="/" exact component={home}></Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
