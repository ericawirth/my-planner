import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"


export default function Calendar() {
    const [event, setEvent] = useState([{ title: 'Smoke & Turkey with KMP', date: '2020-11-24' }]);
    const [modalState, setmodalState] = useState(false)

    const handleDateClick = (arg) => {
        return (setEvent(oldArray => [...oldArray, { title: ' test ', date: arg.dateStr }]));
    }
    const Modal = ({ children, closeModal, title }) => {
        console.log(modalState);
        if (!modalState) {
            return null;
        }
        console.log("HERE");

        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={closeModal} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{title}</p>
                        <button className="delete" onClick={closeModal} />
                    </header>
                    <section className="modal-card-body">
                        <div className="content">
                            {children}
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <a className="button" onClick={closeModal}>Cancel</a>
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
             <Modal
                    closeModal={toggleModal}
                    title="Example modal title"
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet justo in arcu efficitur malesuada nec ut diam. Aenean a iaculis eros. Proin nec purus congue, rutrum sapien id, sodales ante. Nam imperdiet sapien pretium leo dapibus euismod. Ut ac venenatis nunc. Praesent viverra purus vel lacus ullamcorper porta a a augue. Proin rhoncus tempus leo sed ultricies. In luctus aliquam placerat. Cras efficitur enim vitae vulputate consequat. Nulla tellus est, fringilla quis nisi eu, aliquam finibus eros.</p>
                    <p>Aliquam est dui, varius eu tempor ac, ornare vel magna. Suspendisse potenti. Nullam gravida fermentum turpis, at ultricies risus bibendum sit amet. Nulla et arcu id nisi semper ullamcorper cursus sed magna. Phasellus pulvinar ligula vehicula consequat sagittis. Donec tristique tellus sed ex euismod ullamcorper. Vivamus nibh metus, scelerisque sed lorem eget, auctor lobortis sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin congue auctor diam, efficitur dignissim neque. Pellentesque vitae odio ut odio auctor feugiat. Curabitur eget mauris nibh. Vestibulum massa nunc, iaculis at purus venenatis, mollis tincidunt tortor.</p>
                </Modal>
            <div className="calendar">
                <a className="button is-primary" onClick={toggleModal}>
                    Open Modal
            </a>

               

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

