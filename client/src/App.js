import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import logo from './logo.svg';



import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Welcome , Login} from './components';

import {
  DisplayTrees,
  InsertTree,
  UpdateTree,
  PageLayout,
  TreesList
} from './views';

import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

const MainViewContainer = styled.div.attrs({
  className: 'main-view-container'
})`
  padding: 0% 10%;
  /* max-height: 100vh; */
`;

// Switch will set the return value of the component based on the path, before it renders the
// the app compoment --> component ={TreesList} will replace the reference to publicViews in the return at the app component.
class App extends Component {
  render(){
    const publicViews = (
      <Switch>
          {/* <React.Fragment> */}
          <Route exact path={routes.HOME} component={Welcome} />
          <Route exact path={routes.TREES} component={DisplayTrees} />
          <Route exact path={routes.TREE_INSERT} component={InsertTree} /> {/* http://localhost:3001/tree/create */}
          <Route exact path={routes.TREE_UPDATE} component={UpdateTree} />
          {/* <Route exact path={routes.CREATEUSER} component={Login}/> */}
          <Route exact path={routes.USER_LOGIN} component={Login} />
          {/* </React.Fragment> */}
      </Switch>
  );
    return (
      <Router>
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
          <Nav.Link href="/">
            <Navbar.Brand>Todo-React-App</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="mr-auto">
              <Nav.Link href="/trees">Get Trees</Nav.Link>
              <Nav.Link href="/tree">Create Tree</Nav.Link>
            </Nav>
            <Nav>
              {/* <Nav.Link href="/users/create">Sign Up</Nav.Link> */}
              <Nav.Link href="/users/login">Login</Nav.Link>
            </Nav>
        </Navbar>

        <MainViewContainer>
          {publicViews}
        </MainViewContainer>
      </Router>
    )}
};
export default App;
