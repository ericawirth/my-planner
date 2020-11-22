import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"


export default function Calendar() {
    const [event, setEvent] = useState([{ title: 'Smoke & Turkey with KMP', date: '2020-11-24' }]);
    const handleDateClick = (arg) => {
        setEvent(oldArray => [...oldArray, { title: ' test ', date: arg.dateStr }])
    }
    return (
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

