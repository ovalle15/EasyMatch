import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import logo from './logo.svg';


import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Welcome } from './components';

import {
  DisplayTrees,
  InsertTree,
  PageLayout,
  TreesList
} from './views';

import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

const HomeStyles = styled.div`
  padding:0% 25%;
  height: 100vh;
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
          {/* <Route exact path={routes.ITEM} component={ItemPage} /> */}
          <Route exact path={routes.TREE_INSERT} component={InsertTree} /> {/* http://localhost:3001/tree/create */}
          {/* <Route exact path={routes.ITEM_UPDATE} component={ItemUpdate} /> */}
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
        </Navbar>

        <div className="main-view-container">
          {publicViews}
        </div>
      </Router>
    )}
};
export default App;



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
