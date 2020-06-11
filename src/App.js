import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, Link, NavLink, Route, Switch } from "react-router-dom";
import About from './About.js';
import './App.css';
import Footer from './Footer.js';
import Home from './Home.js';
import logo from './image/logo.png';
import Search from './Search.js';
import { SearchOptionContext, RouteContext } from './Contexts.js'

function App() {
  const [nonStopOnly, setNonStopOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [routes, setRoutes] = useState();
  useEffect(() => {
    fetch(`https://iredeem-server.herokuapp.com/routes`, { method: 'get' })
      .then(function (response) {
        if (!response.ok) throw new Error(response.statusText)
        return response.json();
      })
      .then(function (responseJson) {
        setRoutes(responseJson);
      })
      .catch(function (err) {
        console.error(err);
      })
  }, []);
  return (
    <BrowserRouter>
      <SearchOptionContext.Provider value={{ nonStopOnly, availableOnly, setNonStopOnly, setAvailableOnly }}>
        <RouteContext.Provider value={{ routes }}>
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
              <Route path={["/search/:departure/:arrival/:cabin/:date", "/search/:departure/:arrival/:cabin", "/search"]}>
                <Search />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/">
                <Fragment>
                  <Home />
                </Fragment>
              </Route>
            </Switch>
            <Footer />
          </div>
        </RouteContext.Provider>
      </SearchOptionContext.Provider>
    </BrowserRouter>
  );
}

export default App;
