import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Switch } from "react-router-dom";
import About from './About.js';
import './App.css';
import { RouteContext, SearchOptionContext } from './Contexts.js';
import Footer from './Footer.js';
import Home from './Home.js';
import Search from './Search.js';
import Header from './Header.js'

function App() {
  const [timestamp, setTimestamp] = useState(new Date().getTime());
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
      });

    window.addEventListener('scroll', function () {
      let headerArea = document.querySelector('.header_area');
      if (window.scrollY >= headerArea.scrollHeight) {
        headerArea.classList.add("navbar_fixed");
      }
      else {
        headerArea.classList.remove("navbar_fixed");
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <SearchOptionContext.Provider value={{ nonStopOnly, availableOnly, setNonStopOnly, setAvailableOnly }}>
        <RouteContext.Provider value={{ routes }}>
          <div>
            <Header key={timestamp} onSelect={() => {
              setTimestamp(new Date().getTime());
              window.scrollTo(0, 0);
            }} />
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
