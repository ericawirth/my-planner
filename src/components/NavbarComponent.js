import React from 'react';
import '../App.css';
import '../App.sass';

export default function NavbarComponent() {
    return (
        <div className="navBar">
            <div className="name">MyPlanner.</div>
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" href="#">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                            Dashboard
      </a>
                        <a className="navbar-item">
                            Calendar
      </a>
                        <a className="navbar-item">
                            To-Do List
      </a>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="#">
                                My Account
        </a>
                            <div className="navbar-dropdown">
                                <a className="navbar-item" href="#">
                                    Profile
          </a>
                                <a className="navbar-item" href="#">
                                    Log Out
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