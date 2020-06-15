import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from "react-router-dom";
import './App.css';
import logo from './image/logo.png';

export default function Header(props) {
  return (
    <header className="header_area">
      <div className="container">
        <Navbar collapseOnSelect expand="lg" variant="light">
          <Link to="/" onClick={props.onSelect}>
            <img src={logo} alt="logo" />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <ul className="nav navbar-nav menu_nav ml-auto">
              <li className="nav-item">
                <NavLink exact to="/" activeClassName="active" className="nav-link" onClick={props.onSelect}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/search" activeClassName="active" className="nav-link" onClick={props.onSelect}>Search</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" activeClassName="active" className="nav-link" onClick={props.onSelect}>About us</NavLink>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}