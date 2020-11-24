import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import 'react-datepicker/dist/react-datepicker.css';
import { nanoid } from "nanoid";
import axios from 'axios';
import { authMiddleWare } from '../util/auth';
import { useHistory } from "react-router-dom";
import ClassList from './ClassList';

/* eslint-disable jsx-a11y/anchor-is-valid */
let titleText = "";
export default function Calendar(props) {
    const [event, setEvent] = useState([{}]);
    const [modalError, setmodalError] = useState(false);
    const [modalState, setmodalState] = useState(false);
    const [ExistingEvent, setExistingEvent] = useState(false);
    const [ClassInfo, setClassInfo] = useState([]);
    const [classList, setClassList] = useState([{}]);
    const [todoList, setTodoList] = useState([{}]);
    const [currentID, setcurrentID] = useState("");
    let [responseData, setResponseData] = useState('');
    let history = useHistory();
    const [newEvent, setnewEvent] = useState({
        id: "",
        title: "",
        body: "empty For now",
        eventType: "Event",
        classDetails: "None",
        start: "",
        end: "",
        allDay: true,
    });

    const fetchData = useCallback(() => {
        authMiddleWare(history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .get('/events')
            .then((response) => {
                setResponseData({
                    events: response.data
                });
            })
            .catch((error) => {
                console.log(error.response.status)
                if (error.response.status === 403) {
                    localStorage.removeItem('AuthToken');
                    history.push('/login');
                }
            })
        axios
            .get('/classes')
            .then((response) => {
                setClassList(response.data);
            })
            .catch((error) => {
                console.log(error.response.status)
                if (error.response.status === 403) {
                    localStorage.removeItem('AuthToken');
                    history.push('/login');
                }
            })
            axios
            .get('https://calendarific.com/api/v2/holidays?&api_key=' + process.env.REACT_APP_HLD_KEY + '&country=US&year=2020')
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })
            // axios
            // .get('/todos')
            // .then((response) => {
            //     setTodoList(response.data);
            // })
            // .catch((error) => {
            //     console.log(error.response.status)
            //     if (error.response.status === 403) {
            //         localStorage.removeItem('AuthToken');
            //         history.push('/login');
            //     }
            // })
    }, [])

    useEffect(() => {
        authMiddleWare(history);
        fetchData()
    }, [fetchData])

    useEffect(() => {
        addEvents(responseData);
    }, [responseData])
    // useEffect(() => {
    //     addTodos(todoList);
    // }, [todoList])

    function parseDateTime(dateTime) {
        let date = new Date(dateTime);
        let newDate = "";
        let newTime = "00:00";
        if (date && date.getFullYear) {
            newDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
        }
        if (date && date.getHours) {
            newTime = ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);
        }
        return [newDate, newTime];
    }

    function createDateTime(startDate, startTime) {
        let date = startDate;
        let time = startTime;
        if (!date)
            date = "2020-11-15"
        if (!time)
            time = "00:00"
        return startDate + 'T' + startTime;
    }

    // function addTodos(todos){
    //     if(todos && todos.length && todos.length > 0){
    //         let mappedTodos = todos.map(todo => {
    //             return({
    //                 id: todo.id,
    //                 title: todo.data.subject + " "+todo.data.title,
    //                 start: new Date(todo.data.start + "T"+ todo.data.time),
    //                 eventType: 'Todo',
    //             });
    //         })
    //     }
    // }

    function addEvents(events) {
        let eventsData = events.events
        if (eventsData && eventsData.length && eventsData.length > 0) {
            let mappedEvents = eventsData.map(event => {
                return ({
                    id: event.id,
                    title: event.data.title,
                    start: event.data.start,
                    end: event.data.end,
                    eventType: event.data.eventType,
                    classDetails: event.data.classDetails,
                    backgroundColor: event.data.classDetails && event.data.classDetails.data ? event.data.classDetails.data.color : " ",
                    allDay: event.data.allDay ? true : false,
                });
            });
            mappedEvents.push({ id: "1237", title: "Smoke & Turkey with KMP", eventType: "Event", classDetails: "None", start: '2020-11-26T00:00', end: '2020-11-26T00:00', allDay: true });
            setEvent(mappedEvents);
        }
    }

    const handleDateClick = (arg) => {
        titleText = "";
        setExistingEvent(false);
        let id = 'cal-' + nanoid();
        setnewEvent({
            ...newEvent,
            id: id,
            allDay: true,
            classDetails: {},
            start: new Date(arg.date),
            end: new Date(arg.date),
        });
        setmodalError("");
        toggleModal();
    }

    const handleEventClick = (arg) => {
        setExistingEvent(true);
        titleText = arg.event.title;
        setnewEvent({
            ...newEvent,
            id: arg.event.id,
            title: arg.event.title,
            classDetails: arg.event.extendedProps.classDetails ? arg.event.extendedProps.classDetails : " ",
            eventType: arg.event.extendedProps.eventType ? arg.event.extendedProps.eventType : "Event",
            start: arg.event.start,
            end: arg.event.end ? arg.event.end : arg.event.start,
            allDay: arg.event.end ? false : true,
        });
        setmodalError("");
        toggleModal();
    }

    const handleEdit = (event) => {
        authMiddleWare(history);
        if (newEvent.id) {

            const updateEvent = {
                title: titleText,
                body: newEvent.body,
                eventType: newEvent.eventType,
                classDetails: newEvent.classDetails,
                start: newEvent.start,
                end: newEvent.end,
                allDay: newEvent.allDay,
            };
            let options = {
                url: `/event/${newEvent.id}`,
                method: 'put',
                data: updateEvent
            };
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios(options)
                .then(() => {
                })
                .catch((error) => {
                    console.log(error);
                });
            addLocalEventToCalendar(true, undefined);
        };
    }

    const handleDelete = (event) => {
        authMiddleWare(history);
        if (newEvent.id) {
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios
                .delete(`event/${newEvent.id}`)
                .then(() => {
                })
                .catch((err) => {
                    console.log(err);
                });
            deleteLocalEvent();
        };
    }

    function handleChange(e) {
        let value = (e.target.value);
        let name = e.target.name;
        if (e.target.name === "allDay") {
            value = e.target.checked
        }
        if (name === "startDate") {
            value = createDateTime(value, parseDateTime(newEvent.start)[1]);
            name = "start"
        }
        else if (name === "endDate") {
            value = createDateTime(value, parseDateTime(newEvent.end)[1]);
            name = "end"
        }
        else if (name === "startTime") {
            value = createDateTime(parseDateTime(newEvent.start)[0], value);
            name = "start"
        }
        else if (name === "endTime") {
            value = createDateTime(parseDateTime(newEvent.end)[0], value);
            name = "end"
        }

        setnewEvent({
            ...newEvent,
            [name]: value,
        });
    }

    function handleClassDetails(e) {
        let targetId = e.target.options[e.target.selectedIndex].id;

        let detail = classList.filter(item => {
            return item.id === targetId;
        });
        setnewEvent({
            ...newEvent,
            classDetails: detail.length > 0 ? detail[0] : "",
        });
    }

    function addEvent() {
        authMiddleWare(history);
        setnewEvent({
            ...newEvent,
            title: titleText,
        });
        console.log('class det ', newEvent.classDetails)
        const userEvent = {
            title: titleText,
            body: newEvent.body,
            eventType: newEvent.eventType,
            classDetails: newEvent.classDetails,
            start: newEvent.start,
            end: newEvent.end,
            allDay: newEvent.allDay,
            completed: false,
            time: '',
            subject: newEvent.classDetails && newEvent.classDetails.data && newEvent.classDetails.data.classTitle? newEvent.classDetails.data.classTitle: '',
        };
        let options = {
            url: '/event',
            method: 'post',
            data: userEvent
        };

        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios(options)
            .then((e) => {
                let responseId = e.data.id
                setnewEvent({
                    ...newEvent,
                    id: responseId ? responseId : nanoid(),
                });
                addLocalEventToCalendar(false,responseId);
            })
            .catch((error) => {
                toggleModal();
                console.log(error);
            });
    }

    function addLocalEventToCalendar(isEdit, eventId) {
        if (isEdit) {
            deleteLocalEvent();
        }
        if (titleText === "") {
            setmodalError("Set A Title")
        }
        else if (newEvent.allDay) {
            setEvent(oldArray => [...oldArray, { id: eventId? eventId: newEvent.id, allDay: newEvent.allDay, title: titleText, start: newEvent.start, end: newEvent.end, eventType: newEvent.eventType, classDetails: newEvent.classDetails, backgroundColor: newEvent.classDetails && newEvent.classDetails.data ? newEvent.classDetails.data.color : " " }]);
            toggleModal();
        }
        else {
            setEvent(oldArray => [...oldArray, { id: eventId? eventId: newEvent.id, allDay: newEvent.allDay, title: titleText, start: newEvent.start, end: newEvent.end, eventType: newEvent.eventType, classDetails: newEvent.classDetails }]);
            toggleModal();
        }
    }

    function deleteLocalEvent() {
        let eventsArr = event.filter(e => {
            return e.id !== newEvent.id;
        });
        setEvent(eventsArr);
        toggleModal();
    }
    const ShowTime = () => (
        <div className="field">
            <div>
                <input
                    type="time"
                    id="new-calendar-time"
                    className="input input__lg"
                    name="startTime"
                    autoComplete="off"
                    value={parseDateTime(newEvent.start)[1]}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="time"
                    id="new-calendar-time"
                    className="input input__lg"
                    name="endTime"
                    autoComplete="off"
                    value={parseDateTime(newEvent.end)[1]}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
    const Modal = () => {
        if (!modalState) {
            return null;
        }
        return (
            <div className="modal is-active">
                <div className="" onClick={toggleModal} />
                <div className="modal-card p-9">
                    <header className="modal-card-head p-2">
                        <p className="modal-card-title "></p>
                        <button className="delete" onClick={toggleModal} />
                    </header>
                    <section className="modal-card-body ">
                        <div className="content">
                            <div className="modalError">{modalError}</div>
                            <div className="field">
                                <div className="control">
                                    <input className="input is-primary" defaultValue={titleText} name="title" type="text" placeholder="Add a title" onChange={e => { titleText = e.target.value.trim(); setmodalError("") }} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Class</label>
                                <p className="control  ">
                                    <span className="select">
                                        <select
                                            name="classSelect"
                                            value={newEvent.classDetails && newEvent.classDetails.data ? newEvent.classDetails.data.classTitle : " "}
                                            onChange={handleClassDetails}
                                        >
                                            <option id="none-1">None</option>
                                            {
                                                classList && classList.map((item, index) => {
                                                    return (<option id={item.id} key={index}>{item.data.classTitle}</option>)
                                                })
                                            }
                                        </select>
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <label className="label">Event Type</label>
                                <p className="control  ">
                                    <span className="select">
                                        <select
                                            name="eventType"
                                            value={newEvent.eventType}
                                            onChange={handleChange}
                                        >
                                            <option>Event</option>
                                            <option>Todo</option>
                                        </select>
                                    </span>
                                </p>
                            </div>

                            <div className="field">
                                <p>Date</p>
                                <div>
                                    <input
                                        type="date"
                                        id="new-calendar-date"
                                        className="input input__lg"
                                        name="startDate"
                                        autoComplete="off"
                                        value={parseDateTime(newEvent.start)[0]}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="date"
                                        id="new-calendar-date"
                                        className="input input__lg"
                                        name="endDate"
                                        autoComplete="off"
                                        value={parseDateTime(newEvent.end)[0]}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <label className="checkbox">
                                        <input type="checkbox" name="allDay" checked={newEvent.allDay} onChange={handleChange} />
                                        <a> All Day</a>
                                    </label>
                                </div>
                            </div>
                            {!newEvent.allDay ? <ShowTime /> : null}

                        </div>
                    </section>
                    <footer className="modal-card-foot p-1">
                        <div className="control">
                            {ExistingEvent ?
                                <button className="button is-small is-primary ml-4" onClick={handleEdit}>Update</button> :
                                //ELSE
                                <button className="button is-small is-primary ml-4" onClick={e => {
                                    addEvent();
                                }}>Save</button>
                            }
                            {ExistingEvent ? <button className="button is-small is-danger ml-4" onClick={handleDelete}>Delete</button> : null}

                        </div>
                    </footer>
                </div>
            </div>
        );
    }
    const toggleModal = () => {
        setmodalState(!modalState);
    }
    return (
        <div className="calendar">
            <Modal />
            <div >
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView='dayGridMonth'
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    nextDayThreshold={'00:00:00'}
                    selectable={true}
                    editable={true}
                    eventContent={renderEventContent}
                    events={event}
                    headerToolbar={{
                        left: 'today myCustomButton',
                        center: 'title',
                        right: 'prev,next dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                />
            </div>
        </div>
    );
}

function renderEventContent(eventInfo) {
    return (
        <>
            <div className="eventOverflow">
                <b>{eventInfo.timeText + ' '}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        </>
    )
}

