import React, { useState } from 'react';
import axios from 'axios'
import '../App.css';
import '../App.sass';

export default function LoginView(props) {
    const [State, setState] = useState({
        email: '',
        password: '',
        errors: [],
        loading: false
    });
    const [RegisterState, setRegisterState] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        country: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
        loading: false
    });

    function handleChange(e) {
        setState({
            ...State,
            [e.target.name]: e.target.value,
        });
    }

    function handleRegisterChange(e) {
        setRegisterState({
            ...RegisterState,
            [e.target.name]: e.target.value,
        });
    }

    function handleLoginSubmit(e) {
        console.log(State);
        e.preventDefault();
        setState({ ...State, loading: true });
        const userData = {
            email: State.email,
            password: State.password
        };

        console.log(userData);
        axios
            .post('/login', userData)
            .then((response) => {
                localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
                setState({ ...State, loading: false });
                props.history.push('/');
            })
            .catch((error) => {
                console.log(error.response.data);
                setState({
                    ...State,
                    errors: error.response.data,
                    loading: false
                });
            });
    };

    function handleRegisterSubmit(e) {
        e.preventDefault();
        setRegisterState({ ...RegisterState, loading: true });
        const newUserData = {
            email: RegisterState.email,
            password: RegisterState.password,
            confirmPassword: RegisterState.confirmPassword
        }; 

        console.log(newUserData);

        axios.post('/signup', newUserData)
            .then((response) => {
                localStorage.setItem('AuthToken', `${response.data.token}`);
                setRegisterState({ ...RegisterState, loading: false });
                props.history.push('/');
            })
            .catch((error) => {
                console.log(error.response.data);
                setRegisterState({
                    ...RegisterState,
                    errors: error.response.data,
                    loading: false
                });
            });
    };


    return (
        <div className="container mt-5">
            <div className="container">
                <div className="tile is-ancestor">
                    <div className="tile is-parent is-vertical is-12">
                        <div className="tile is-child is-vertical notification is-primary">
                            <h1 className="title">Welcome,</h1>
                            <h2 className="subtitle">Please login to access your planner!</h2>
                            <figure className="image">
                                <img className="kmpimage" src="https://www.cs.unc.edu/~jeffay/images/dirt/ketan-at-desk.jpg"></img>
                            </figure>
                        </div>
                        <div className="tile is-child notification is-warning">
                            <h1 className="loginlabel">Login</h1>
                            <form>
                                <div className="field">
                                    <label className="label1">Email:</label>
                                    <div className="control">
                                        <input className="" id="email"  label="Email Address" type="text" placeholder="checkm8" name="email" onChange={handleChange}></input>
                                    </div>
                                </div>
                                <div className="">
                                    <label className="label1">Password:</label>
                                    <div className="">
                                        <input className=""  label="Password" type="password" placeholder="*******" name="password" onChange={handleChange}></input>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="">
                                        <input onClick={handleLoginSubmit} className="" type="submit"></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="tile is-child notification is-danger">
                            <h1 className="signuplabel">Don't have an account? Sign Up!</h1>
                            <form>
                                <div className="">
                                    <label className="label1">Email:</label>
                                    <div className="">
                                        <input className="" type="text" placeholder="checkm8" name="email" onChange={handleRegisterChange}></input>
                                    </div>
                                </div>
                                <div className="label1">
                                    <label className="">Create Password:</label>
                                    <div className="">
                                        <input className="" type="password" name="password" placeholder="*******" onChange={handleRegisterChange}></input>
                                    </div>
                                </div>
                                <div className="">
                                    <label className="label1">Repeat Password:</label>
                                    <div className="">
                                        <input className="" type="password" name="confirmPassword" placeholder="Password123!" onChange={handleRegisterChange}></input>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="">
                                        <input className="" type="submit" onClick={handleRegisterSubmit}></input>
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