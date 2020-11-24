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
            <div className="modal is-active">
                <div className="button" onClick={toggleModal}></div>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Pink</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/eb53fa.png" />
                                </figure>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Red</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/ee032a.png" />
                                </figure>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Orange</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/ffac1a.png" />
                                </figure>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Green</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/1cc93e.png" />
                                </figure>
                            </article>
                        </div>
                    </div>

                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Teal</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/3fb298.png" />
                                </figure>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Light Blue</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/8ec4fa.png" />
                                </figure>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Blue</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/341AF1.png" />
                                </figure>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Purple</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/681CDF.png" />
                                </figure>
                            </article>
                        </div>
                    </div>
                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Maroon</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/663366.png" />
                                </figure>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Yellow</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/ffe135.png" />
                                </figure>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Brown</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/663300.png" />
                                </figure>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="subtitle">Grey</p>
                                <figure class="image is-4by3 is-rounded">
                                    <img src="https://www.colorhexa.com/5a5958.png" />
                                </figure>
                            </article>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large"
                    aria-label="close" onClick={toggleModal}>
                </button>
            </div>
        );
    }

    return (
        <div className="addcoursepage">
            <div className="addclasshero">
                <section className="hero is-primary is-bold mt-5">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Add a Class:</h1>
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
                    <div className="separator1">Additional Information:</div>
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
                                    <option>Maroon</option>
                                    <option>Yellow</option>
                                    <option>Brown</option>
                                    <option>Grey</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="button" onClick={toggleModal}>Click to see color choices</div>
                    <Modal />
                </div>
            </div>
        </div>
    );
}