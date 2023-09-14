import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import logo from "./img/beer.png";
import { Nav, Navbar } from "react-bootstrap";

// Import components
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Player from "./components/Player";
import Instructor from "./components/Instructor";
import About from "./components/About";
import Role from "./components/Role";
import NotFound from "./components/NotFound";
import LoginInstructor from "./components/LoginInstructor";
import LoginStudent from "./components/LoginStudent";
import GameSettings from "./components/GameSettings";
import GamePageFactory from "./components/GamePageFactory";
import GamePageWholesaler from "./components/GamePageWholesaler";
import GamePageDistributor from "./components/GamePageDistributer";
import GamePageRetailer from "./components/GamePageRetailer";

// Import sample view
import InstructorSample from "./InstructorSample";

// Import actions
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

// Import helpers
import { history } from "./helpers/history";

const App = () => {
  // Hold Instructor's state
  const [showInstructorSources, setShowInstructorSources] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowInstructorSources(currentUser.authenticatedUser.role.includes("2"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand id="brand" href="/">
            <img src={logo} width="40" height="40" alt="Beer Game Logo" />
            Beer Game
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav.Item>
              {showInstructorSources && (
                <Nav.Item>
                  <Nav.Link href="/instructor">Instructor</Nav.Link>
                </Nav.Item>
              )}
              {currentUser && (
                <Nav.Item>
                  <Nav.Link href="/player">Player</Nav.Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <Nav.Link href="/instructor-sample">
                  Instructor View Sample
                </Nav.Link>
              </Nav.Item>
            </Nav>

            {currentUser ? (
              <Nav className="ml-auto">
                <Nav.Item>
                  <Nav.Link href="/Role">Join a Game</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/login" onClick={logOut}>
                    Log Out
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <Nav.Item>
                  <Nav.Link href="/login">Log In</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/player" component={Player} />
            <Route path="/Role" component={Role} />
            <Route path="/instructor" component={Instructor} />
            <Route path="/instructor-sample" component={InstructorSample} />
            <Route path="/LoginInstructor" component={LoginInstructor} />
            <Route path="/LoginStudent" component={LoginStudent} />
            <Route path="/GameSettings" component={GameSettings} />
            <Route path="/game-page-factory" component={GamePageFactory} />
            <Route path="/game-page-distributor" component={GamePageDistributor} />
            <Route path="/game-page-wholesaler" component={GamePageWholesaler} />
            <Route path="/game-page-retailer" component={GamePageRetailer} />
            <Route path="/test" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
