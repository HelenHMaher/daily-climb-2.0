import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { GlobalStyles } from "./global";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { AddClimb, AddDrylandWorkout, Home, MyProfile } from "./components";

function App() {
  //set up redux toolkit!!
  /*const [profileName, setProfileName] = useState("");
  function getProfileName(name) {
    setProfileName(name);*/
  }
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <h1>My Daily Climb</h1>
          <h3>{profileName}</h3>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add-climb">Climb</Link>
              </li>
              <li>
                <Link to="/add-dryland-workout">Dryland</Link>
              </li>
              <li>
                <Link to="/my-profile">My Profile</Link>
              </li>
            </ul>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add-climb" component={AddClimb} />
              <Route
                exact
                path="/add-dryland-workout"
                component={AddDrylandWorkout}
              />
              <Route exact path="/my-profile" component={MyProfile} />
            </Switch>
          </nav>
          <form className="logout" action="/logout">
            <button type="submit">Logout</button>
          </form>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
