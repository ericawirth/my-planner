import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import 'react-datepicker/dist/react-datepicker.css';
/* eslint-disable jsx-a11y/anchor-is-valid */
let titleText = "";
export default function Calendar() {
    const [event, setEvent] = useState([{id:0, title: 'Smoke & Turkey with KMP', date: '2020-11-24' }]);
    const [modalError, setmodalError] = useState(false);
    const [modalState, setmodalState] = useState(false);
    const [DeleteEvent, setDeleteEvent] = useState(false);
    const [newEvent, setnewEvent] = useState({
        title: "",
        eventType: "Event",
        startDate: "",
        endDate: "",
        allDay: true,
        startTime: "",
        endTime: ""
    });


    const handleDateClick = (arg) => {
        titleText = "";
        setDeleteEvent(false); 
        let date = new Date(arg.date);
        let id = 0;
        if(event.length>0){
            id = event[event.length-1].id + 1;
        }
        setnewEvent({
            ...newEvent,
            id: id,
            allDay: true,
            startDate: date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2),
            endDate: date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2),
            startTime: ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2),
            endTime: ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()+15).slice(-2)
        });
        setmodalError("");
        toggleModal();
    }

    const handleEventClick = (arg) => {  
        setDeleteEvent(true);      
        let startDate = new Date(arg.event.start);
        let endDate = new Date(arg.event.end);
        titleText = arg.event.title;
        console.log(arg);
        setnewEvent({
            ...newEvent,
            id: arg.event.id,
            title: arg.event.title,
            allDay:  arg.event.end? false: true,
            startDate: startDate.getFullYear() + '-' + ("0" + (startDate.getMonth() + 1)).slice(-2) + '-' + ("0" + startDate.getDate()).slice(-2),
            endDate: arg.event.end ? endDate.getFullYear() + '-' + ("0" + (endDate.getMonth() + 1)).slice(-2) + '-' + ("0" + endDate.getDate()).slice(-2): startDate.getFullYear() + '-' + ("0" + (startDate.getMonth() + 1)).slice(-2) + '-' + ("0" + startDate.getDate()).slice(-2),
            startTime: ("0" + startDate.getHours()).slice(-2) + ':' + ("0" + startDate.getMinutes()).slice(-2),
            endTime: arg.event.end ? ("0" + endDate.getHours()).slice(-2) + ':' + ("0" + endDate.getMinutes()).slice(-2): "",
        });
        setmodalError("");
        toggleModal();
    }

    function handleChange(e) {
        let value = (e.target.value);
        if (e.target.name == "allDay")
            value = e.target.checked
        setnewEvent({
            ...newEvent,
            [e.target.name]: value,
        });
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
                    value={newEvent.startTime}
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
                    value={newEvent.endTime}
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
                                    <input className="input is-primary" defaultValue={titleText} name="title" type="text" placeholder="Add a title" onChange={e =>{titleText = e.target.value.trim(); setmodalError("")}} />
                                </div>
                            </div>
                            <div className="field">
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
                                        value={newEvent.startDate}
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
                                        value={newEvent.endDate}
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
                            <button className="button is-small is-primary ml-4" onClick={e => {
                                setnewEvent({
                                    ...newEvent,
                                    title: titleText,
                                });
                                if(titleText === ""){
                                    setmodalError("Set A Title")
                                }
                                else if(newEvent.allDay){                                    
                                    setEvent(oldArray => [...oldArray, {id:newEvent.id, title: titleText, start: newEvent.startDate, end: newEvent.endDate}]);
                                    toggleModal();
                                }
                                else{
                                    setEvent(oldArray => [...oldArray, {id:newEvent.id, title: titleText, start: newEvent.startDate+'T'+newEvent.startTime, end: newEvent.endDate+'T'+newEvent.endTime}]);
                                    toggleModal();
                                }
                            }}>Save</button>
                            {DeleteEvent ? <button className="button is-small is-danger ml-4" onClick={e => {
                                    let eventsArr = event.filter(e => { 
                                        return e.id != newEvent.id;
                                    });
                                    setEvent(eventsArr);
                                    toggleModal();
                                }
                            }>Delete</button> : null}
                            
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
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
            </div>
        </>
    )
}

