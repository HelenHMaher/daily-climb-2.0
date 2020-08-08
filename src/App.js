import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Home from "./components/Home";
import ClimbingSession from "./components/ClimbingSession";
import LogWorkout from "./components/LogWorkout";
import DrylandWorkouts from "./components/DrylandWorkouts";
import MyProfile from "./components/MyProfile";

function App() {
  return (
    <div>
      <Router>
        <h1>My Daily Climb</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/climbing-session">Log a Climbing Session</Link>
            </li>
            <li>
              <Link to="/log-workout">Log a Workout</Link>
            </li>
            <li>
              <Link to="/dryland-workouts">Dryland Training</Link>
            </li>
            <li>
              <Link to="/my-profile">My Profile</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/climbing-session" component={ClimbingSession} />
            <Route exact path="/log-workout" component={LogWorkout} />
            <Route exact path="/dryland-workouts" component={DrylandWorkouts} />
            <Route exact path="/my-profile" component={MyProfile} />
          </Switch>
        </nav>
        <form className="logout" action="/logout">
          <button type="submit">Logout</button>
        </form>
      </Router>
    </div>
  );
}

export default App;
