import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AdminMovie from './pages/AdminMovie'
import HomeMovie2 from "./pages/HomeMovie2"
import MoviePlay from "./pages/MoviePlay"

function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/movies/:id">
            <MoviePlay />
          </Route>
          <Route path="/admin-movies">
            <AdminMovie />
          </Route>
          <Route path="/movies">
            <HomeMovie2 />
          </Route>
          <Route path="/movies/">
            <Redirect to={{pathname:"/movies"}}/>
          </Route>
          <Route path="/">
            <Redirect to={{pathname:"/movies"}}/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
