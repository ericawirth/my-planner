import React from 'react';
import '../App.css';
import '../App.sass';

export default function LoginView() {
    return (
        <div className="loginContainer">
            <section className="">
                <div className="container">
                    <div className="">
                        <div className="column">
                            <h1 className="loginlabel">Login</h1>
                            <form>
                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Cookie Monster" name="username"></input>
                                    </div>
                                </div>
                                <div className="">
                                    <label className="">Password</label> 
                                    <div className="">
                                        <input className="" type="password" placeholder="password124" name="password"></input>
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
                                <div  className="">
                                    <div className="">
                                        <input className="" type="submit"></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="">
                            <h1 className="loginlabel">Signup</h1>
                            <form>
                                <div className="">
                                    <label className="">Username</label>
                                    <div className="">
                                        <input className="" type="text" placeholder="Cookie Monster  2.0" name="username"></input>                                    
                                    </div>
                                </div>
                                <div  className="">
                                    <label className="">Password</label>
                                    <div className="">
                                        <input className="" type="password"  placeholder="password12345"></input>
                                    </div>
                                </div>
                                <div className="">
                                    <label className="">Repeat Password</label>
                                    <div className="">
                                        <input className="input" type="password"  placeholder="password12345" name="password"></input>
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
            </section>
        </div>
    )
}