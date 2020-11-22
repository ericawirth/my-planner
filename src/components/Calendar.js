import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import 'react-datepicker/dist/react-datepicker.css';

export default function Calendar() {
    const [event, setEvent] = useState([{ title: 'Smoke & Turkey with KMP', date: '2020-11-24' }]);
    const [modalState, setmodalState] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const handleDateClick = (arg) => {
        let date = new Date(arg.date);
        setStartDate(date);
        setEndDate(date);
        setStartTime(date);
        setEndTime(date);
        toggleModal();
        console.log(date.getHours());

        /*
        return (
            setEvent(oldArray => [...oldArray, { title: ' test ', date: arg.dateStr, backgroundColor: 'red' }])
        );*/
    }
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
                    <section className="modal-card-body test">
                        <div className="content">
                            <div className="field">
                                <div className="control">
                                    <input className="input is-primary" type="text" placeholder="Add a title" />
                                </div>
                            </div>
                            <div className="field">
                                <p className="control  ">
                                    <span className="select">
                                        <select>
                                            <option>Event</option>
                                            <option>Todo</option>
                                        </select>
                                    </span>
                                </p>
                            </div>

                            <div className="field">
                                <p>Date</p>
                                <div>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                    />
                                </div>
                                <div>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={date => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                    />
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="checkbox">
                                        <input type="checkbox" /> 
                                             <a> All Day</a>
                                    </label>
                                </div>
                            </div>

                            <div className="field">
                                <div>
                                    <DatePicker
                                        selected={startTime}
                                        onChange={time => setStartTime(time)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                </div>
                                <div>
                                    <DatePicker
                                        selected={endTime}
                                        onChange={time => setEndTime(time)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot p-1">
                        <div className="control">
                            <button className="button is-small is-primary ml-4">Save</button>
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
        <div>
            <Modal />
            <div className="calendar">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView='timeGridWeek'
                    dateClick={handleDateClick}
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
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

