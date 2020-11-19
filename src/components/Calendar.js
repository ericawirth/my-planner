import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"


export default function Calendar() {
    const [event, setEvent] = useState([{title: 'Smoke & Turkey with KMP', date: '2020-11-24'}]);
    const handleDateClick = (arg) => {
        setEvent(oldArray => [...oldArray, {title: 'test', date: arg.dateStr}])
    }
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={handleDateClick}
                selectable={true}
                editable={true}
                eventContent={renderEventContent}
                events={event}
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

