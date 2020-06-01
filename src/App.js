import React, { Fragment } from 'react';
import Home from './Home.js';
import About from './About.js';
import Footer from './Footer.js';
import logo from './image/logo.png';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Search from './Search.js';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="header_area">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                <ul className="nav navbar-nav menu_nav ml-auto">
                  <li className="nav-item">
                    <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/search" activeClassName="active" className="nav-link">Search</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/about" activeClassName="active" className="nav-link">About us</NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <Switch>
          <Route path="/search">
            <Search/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/">
            <Fragment>
              <Home/>
            </Fragment>
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
