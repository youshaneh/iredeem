import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { RouteContext } from '../context/Contexts.js';
import About from '../pages/About.js';
import Footer from './common/Footer.js';
import Header from './common/Header.js';
import Home from '../pages/Home.js';
import Search from '../pages/Search.js';
import Account from '../pages/Account.js';
import { environment } from '../environment.js'
import { connect } from 'react-redux'
import { setToken, setUserInfo, pushNotification } from '../redux/actions'
import { getJwtPayload } from "../utils/utils.js";
import ToastContainer from './ToastContainer';

function App({ userId, setToken, setUserInfo, pushNotification }) {
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
  }, []);
  
  useEffect(() => {
    if(window.localStorage.token) setToken(window.localStorage.token);
    if(window.localStorage.userInfo) setUserInfo(JSON.parse(window.localStorage.userInfo));
  }, []);

  useEffect(() => {
    window.addEventListener("message", async event => {
      if (event.origin !== window.location.origin) return;
      const token = event.data.token;
      if (!token) return;
      setToken(token);
      const payload = getJwtPayload(token);
      const getUserResponse = await fetch(`${environment.authBaseUrl}/users/${payload.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!getUserResponse.ok) throw new Error(getUserResponse.statusText)
      const getUserContent = await getUserResponse.json();
      setUserInfo(getUserContent)
    });
  }, []);

  useEffect(() => {
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

  
  useEffect(() => {
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
            <Route path="/account">
              {userId ? <Account /> : <Redirect to="/" />}
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
          <ToastContainer />
        </div>
      </RouteContext.Provider>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ userId }) => ({ userId });
export default connect(mapStateToProps, { setToken, setUserInfo, pushNotification })(App);