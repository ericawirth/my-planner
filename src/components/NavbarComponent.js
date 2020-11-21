import React from 'react';
import '../App.css';
import '../App.sass';
import { Link, BrowserRouter, NavLink } from "react-router-dom";

export default function NavbarComponent() {
    return (
        <div className="navBar">
            <div className="name">
                My Planner.
            </div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"  href="#">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">

                    <Link to="/" className="navbar-item"> 
                        Home
                    </Link>

                    <a className="navbar-item">
                        Documentation
          </a>
                    <Link to="/todolist" className="navbar-item"> 
                        Todo List
                    </Link>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link" href="#">
                            More
          </a>
                        <div className="navbar-dropdown">
                            <a className="navbar-item" href="#">
                                About
          </a>
                            <a className="navbar-item" href="#">
                                Jobs
          </a>
                            <a className="navbar-item" href="#">
                                Contact
          </a>
                            <a className="navbar-item" href="#">
                                Report an issue
          </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </div>
    )
}