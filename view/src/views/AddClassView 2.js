import React, { useState } from 'react';
import '../App.css';
import '../App.sass';

export default function AddClassView() {
    const [modalState, setmodalState] = useState(false);
    const toggleModal = () => {
        setmodalState(!modalState);
    }
    const Modal = () => {
        if (!modalState) {
            return null;
        }
        return (
            
        );
    }

    return (
        <div className="">
            <div className="addclasshero">
                <section className="hero is-primary is-bold mt-5">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Add a Course:</h1>
                        </div>
                    </div>
                </section>
            </div>
            <div className="section">
                <div className="container">
                    <div className="field">
                        <label className="label">Course Name:</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="ex: COMP426"></input>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Professor:</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="ex: KMP"></input>
                        </div>
                    </div>
                    <div className="separator"><h1><strong>Additional Information:</strong></h1></div>
                    <div className="field">
                        <label className="label">Meeting Schedule:</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="ex: TTH 4:30PM-5:40PM"></input>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Zoom Link:</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="ex: https://unc.zoom.us/j/98837978925"></input>
                        </div>
                    </div>
                    <Modal/>
                    <div className="field">
                        <label className="label">Course Color Selector</label>
                        <div className="control">
                            <div className="select">
                                <select>
                                    <option>Select Color</option>
                                    <option>Pink</option>
                                    <option>Red</option>
                                    <option>Orange</option>
                                    <option>Green</option>
                                    <option>Teal</option>
                                    <option>Light Blue</option>
                                    <option>Blue</option>
                                    <option>Purple</option>
                                    <option>Black</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}