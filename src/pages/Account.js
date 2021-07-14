import React from 'react';
import { useRouteMatch, Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './About.scss';
import PersonalInfo from '../components/account/PersonalInfo.js';
import MyFlight from '../components/account/MyFlight.js';

export default function Account() {
  let { path } = useRouteMatch();
  return (
    <>
      <section className="breadcrumb_area">
        <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background=""></div>
        <div className="container">
          <div className="page-cover text-center">
            <h2 className="page-cover-tittle f_48">Account</h2>
          </div>
        </div>
      </section>
      <section className="about_history_area section_gap">
        <div className="container">
          <div className="row">
            <div className="d-none d-md-block col-md-3 col-xl-2 align-items-center">
              <ul className="list-unstyled components">
                <li>
                  <NavLink to="/account/personal-info" activeClassName="active" className="nav-link sub-item">Personal info</NavLink>
                </li>
                <li>
                  <NavLink to="/account/my-flights" activeClassName="active" className="nav-link sub-item">My flighs</NavLink>
                </li>
              </ul>
            </div>
            <div className="container align-items-center" style={{flex: 1}}>
              <Switch>
                <Route path={`${path}/personal-info`}>
                  <PersonalInfo />
                </Route>
                <Route path={`${path}/my-flights`}>
                  <MyFlight />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}