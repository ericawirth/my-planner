import React from 'react';
import '../App.css';
import '../App.sass';
import { Link, BrowserRouter, NavLink } from "react-router-dom";
/* eslint-disable jsx-a11y/anchor-is-valid */
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
                        <a className="navbar-item" href="/calendar">
                            Calendar
                        </a>
                        <a className="navbar-item" href="/todolist">
                            To-Do List
                        </a>
                    </div>
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
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}