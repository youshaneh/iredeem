import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RouteContext } from '../context/Contexts.js';
import About from '../pages/About.js';
import Footer from './common/Footer.js';
import Header from './common/Header.js';
import Home from '../pages/Home.js';
import Search from '../pages/Search.js';
import { environment } from '../environment.js'

function App() {
  const [routes, setRoutes] = useState();
  useEffect(() => {
    fetch(`${environment.baseUrl}/routes`, { method: 'get' })
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
      if (window.scrollY >= headerArea.scrollHeight / 2) {
        headerArea.classList.add("navbar_fixed");
      }
      else {
        headerArea.classList.remove("navbar_fixed");
      }
    });
  }, []);
  return (
    <BrowserRouter basename="/">
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
    </BrowserRouter>
  );
}

export default App;
