import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import '../App.sass';
import ClassList from '../components/ClassList';
import { nanoid } from "nanoid";
import { authMiddleWare } from '../util/auth';
import { useHistory } from "react-router-dom";
import axios from 'axios';
/* eslint-disable jsx-a11y/alt-text */

export default function AddClassView() {
    let history = useHistory();
    const [modalState, setmodalState] = useState(false);
    const [allClasses, setAllClasses] = useState([{}]);
    let [responseData, setResponseData] = useState('');
    const [currentClass, setCurrentClass] = useState({
        id: "",
        classTitle: "",
        classProfessor: "",
        classSchedule: "",
        classZoom: "",
        color: "blue",
    });

    const fetchData = useCallback(() => {
        authMiddleWare(history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .get('/classes')
            .then((response) => {
                setResponseData({
                    classes: response.data
                });
            })
            .catch((error) => {
                console.log(error.response.status)
                if (error.response.status === 403) {
                    localStorage.removeItem('AuthToken');
                    history.push('/login');
                }
            })
    }, [])
    useEffect(() => {
        authMiddleWare(history);
        fetchData();
    }, [fetchData])
    useEffect(() => {
        addClasses(responseData);
    }, [responseData])

    const [colorChoice, setColorChoice] = useState('blue');
    const toggleModal = () => {
        setmodalState(!modalState);
    }

    function handleChange(e) {
        let name = e.target.name;
        setCurrentClass({
            ...currentClass,
            [name]: e.target.value,
        });
    }

    function handleSubmit() {
        authMiddleWare(history);

        const userClass = {
            classTitle: currentClass.classTitle,
            classProfessor: currentClass.classProfessor,
            classSchedule: currentClass.classSchedule,
            classZoom: currentClass.classZoom,
            color: colorChoice,
        };

        let options = {
            url: '/class',
            method: 'post',
            data: userClass
        };

        let responseId = "";
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios(options)
            .then((e) => {
                responseId = e.data.id
                currentClass.id = responseId ? responseId : nanoid();
                setAllClasses(oldArray => [...oldArray, userClass]);
                setCurrentClass({
                    id: "",
                    classTitle: "",
                    classProfessor: "",
                    classSchedule: "",
                    classZoom: "",
                    color: "blue",
                });
            })
            .catch((error) => {
                console.log(error);
            });        
    }

    function handleDelete(e) {
        const deleteId = e.target.id;
        authMiddleWare(history);
        const arr = allClasses.filter((item) => item.id !== deleteId);
        setAllClasses(arr);

        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .delete(`class/${deleteId}`)
            .then(() => {
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function addClasses(classes) {
        let classData = classes.classes
        if (classData && classData.length && classData.length > 0) {
            let mappedClasses = classData.map(cls => {
                return ({
                    id: cls.id,
                    classTitle: cls.data.classTitle,
                    classProfessor: cls.data.classProfessor,
                    classSchedule: cls.data.classSchedule,
                    classZoom: cls.data.classZoom,
                    color: cls.data.color,
                });
            });
            setAllClasses(mappedClasses);
        }
    }



    const Modal = () => {
        if (!modalState) {
            return null;
        }
        const handleColorSelect = (e) => {
            if (e.target.id) {
                setColorChoice(e.target.id);
                toggleModal();
            }
        }
        return (
            <div className="modal is-active">
                <div className="button" onClick={toggleModal}></div>
                <div className="modal-background"></div>
                <div className="modal-content is-clipped">
                    <div className="tile is-ancestor">
                        <div id="pink" className="tile is-parent">
                            <article id="pink" className="tile is-child box changePointer" onClick={handleColorSelect}>
                                <p className="subtitle" id="pink">Pink</p>
                                <figure id="pink" className="image is-4by3 is-rounded">
                                    <img id="pink" src="https://www.colorhexa.com/eb53fa.png" />
                                </figure>
                            </article>
                        </div>
                        <div id="red" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="red" onClick={handleColorSelect}>
                                <p className="subtitle" id="red" >Red</p>
                                <figure id="red" className="image is-4by3 is-rounded">
                                    <img id="red" src="https://www.colorhexa.com/ee032a.png" />
                                </figure>
                            </article>
                        </div>
                        <div id="orange" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="orange" onClick={handleColorSelect}>
                                <p className="subtitle" id="orange" >Orange</p>
                                <figure id="orange" className="image is-4by3 is-rounded">
                                    <img id="orange" src="https://www.colorhexa.com/ffac1a.png" />
                                </figure>
                            </article>
                        </div>
                        <div id="green" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="green" onClick={handleColorSelect}>
                                <p className="subtitle" id="green" >Green</p>
                                <figure id="green" className="image is-4by3 is-rounded">
                                    <img id="green" src="https://www.colorhexa.com/1cc93e.png" />
                                </figure>
                            </article>
                        </div>
                    </div>

                    <div className="tile is-ancestor">
                        <div id="teal" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="teal" onClick={handleColorSelect}>
                                <p className="subtitle" id="teal" >Teal</p>
                                <figure id="teal" className="image is-4by3 is-rounded">
                                    <img id="teal" src="https://www.colorhexa.com/3fb298.png" />
                                </figure>
                            </article>
                        </div>
                        <div id="lightblue" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="lightblue" onClick={handleColorSelect}>
                                <p className="subtitle" id="lightblue" >Light Blue</p>
                                <figure id="lightblue" className="image is-4by3 is-rounded">
                                    <img id="lightblue" src="https://www.colorhexa.com/8ec4fa.png" />
                                </figure>
                            </article>
                        </div>
                        <div id="blue" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="blue" onClick={handleColorSelect}>
                                <p className="subtitle" id="blue" >Blue</p>
                                <figure id="blue" className="image is-4by3 is-rounded">
                                    <img id="blue" src="https://www.colorhexa.com/341AF1.png" />
                                </figure>
                            </article>
                        </div>
                        <div id="purple" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="purple" onClick={handleColorSelect}>
                                <p className="subtitle" id="purple" >Purple</p>
                                <figure id="purple" className="image is-4by3 is-rounded">
                                    <img id="purple" src="https://www.colorhexa.com/681CDF.png" />
                                </figure>
                            </article>
                        </div>
                    </div>
                    <div className="tile is-ancestor">
                        <div id="maroon" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="maroon" onClick={handleColorSelect}>
                                <p className="subtitle" id="maroon" >Maroon</p>
                                <figure id="maroon" className="image is-4by3 is-rounded">
                                    <img id="maroon" src="https://www.colorhexa.com/663366.png" />
                                </figure>
                            </article>
                        </div>
                        <div id="yellow" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="yellow" onClick={handleColorSelect}>
                                <p className="subtitle" id="yellow" >Yellow</p>
                                <figure id="yellow" className="image is-4by3 is-rounded">
                                    <img id="yellow" src="https://www.colorhexa.com/ffe135.png" />
                                </figure>
                            </article>
                        </div>
                        <div id="brown" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="brown" onClick={handleColorSelect}>
                                <p className="subtitle" id="brown" >Brown</p>
                                <figure id="brown" className="image is-4by3 is-rounded">
                                    <img id="brown" src="https://www.colorhexa.com/663300.png" />
                                </figure>
                            </article>
                        </div>
                        <div id="grey" className="tile is-parent">
                            <article className="tile is-child box changePointer" id="grey" onClick={handleColorSelect}>
                                <p className="subtitle" id="grey" >Grey</p>
                                <figure id="grey" className="image is-4by3 is-rounded">
                                    <img id="grey" src="https://www.colorhexa.com/5a5958.png" />
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
            <div className="columns">
                <div className="column m-4">
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
                                    <input className="input" name="classTitle" value={currentClass.classTitle} type="text" placeholder="ex: COMP426" onChange={handleChange}></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Professor:</label>
                                <div className="control">
                                    <input name="classProfessor" className="input" value={currentClass.classProfessor} type="text" placeholder="ex: KMP" onChange={handleChange}></input>
                                </div>
                            </div>
                            <div className="separator1">Additional Information:</div>
                            <div className="field">
                                <label className="label">Meeting Schedule:</label>
                                <div className="control">
                                    <input name="classSchedule" className="input" type="text" value={currentClass.classSchedule} placeholder="ex: TTH 4:30PM-5:40PM" onChange={handleChange}></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Zoom Link:</label>
                                <div className="control">
                                    <input name="classZoom" className="input" type="text" value={currentClass.classZoom} placeholder="ex: https://unc.zoom.us/j/98837978925" onChange={handleChange}></input>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Course Color Selector</label>
                                <label className="label" style={{ color: colorChoice }}>{colorChoice}</label>
                            </div>
                            <div className="button" onClick={toggleModal}>Click to see color choices</div>
                            <Modal />
                        </div>
                        <button className="button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className="column m-4">
                    <div className="addclasshero">
                        <section className="hero is-primary is-bold mt-5">
                            <div className="hero-body">
                                <div className="container">
                                    <h1 className="title">Class List</h1>
                                </div>
                            </div>
                        </section>

                    </div>
                    <div>
                        {allClasses && allClasses.length > 0 && allClasses.filter(value => Object.keys(value).length !== 0).map((cls, index) => {
                            return <ClassList key={index} classItem={cls} doDelete={handleDelete} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}