import React from 'react';
import '../App.css';
import '../App.sass';

export default function LoginView() {
    return (
        <div className="container mt-5">
            <div className="container">
                <div className="tile is-ancestor">
                    <div className="tile is-parent is-vertical is-12">
                        <div className="tile is-child is-vertical notification is-primary">
                            <h1 className="title">Welcome,</h1>
                            <h2 className="subtitle">Please login to access your planner!</h2>
                            <figure className="image is-3by1">
                            <img src="https://bulma.io/images/placeholders/640x480.png"></img>
                            </figure>
                        </div>
                        <div className="tile is-child notification is-warning">
                            <h1 className="loginlabel">Login</h1>
                            <form>
                                <div className="field">
                                    <label className="label1">Username:</label>
                                    <div className="control">
                                        <input className="" type="text" placeholder="checkm8" name="username"></input>
                                    </div>
                                </div>
                                <div className="">
                                    <label className="label1">Password:</label>
                                    <div className="">
                                        <input className="" type="password" placeholder="*******" name="password"></input>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="">
                                        <label className="checkbox">
                                            <input type="checkbox" name="remember"></input>
                                Remember your login info?
                            </label>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="">
                                        <input className="" type="submit"></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="tile is-child notification is-danger">
                            <h1 className="signuplabel">Don't have an account? Sign Up!</h1>
                            <form>
                                <div className="">
                                    <label className="label1">Create Username:</label>
                                    <div className="">
                                        <input className="" type="text" placeholder="checkm8" name="username"></input>
                                    </div>
                                </div>
                                <div className="label1">
                                    <label className="">Create Password:</label>
                                    <div className="">
                                        <input className="" type="password" placeholder="*******"></input>
                                    </div>
                                </div>
                                <div className="">
                                    <label className="label1">Repeat Password:</label>
                                    <div className="">
                                        <input className="" type="password" placeholder="Password123!" name="password"></input>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="">
                                        <input className="" type="submit"></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}