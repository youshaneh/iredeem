import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RouteContext, SearchOptionContext } from './Contexts.js';
import About from './About.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Home from './Home.js';
import Search from './Search.js';

function App() {
  const [nonStopOnly, setNonStopOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(true);
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
    <BrowserRouter basename="/iredeem">
      <SearchOptionContext.Provider value={{ nonStopOnly, availableOnly, setNonStopOnly, setAvailableOnly }}>
        <RouteContext.Provider value={{ routes }}>
          <div>
            <Header />
            <Switch>
              <Route path={["/search/:departure/:arrival/:cabin/:date", "/search/:departure/:arrival/:cabin", "/search"]}>
                <Search />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/">
                <Home />
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
