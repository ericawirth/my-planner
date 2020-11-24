import React from 'react';
import Calendar from '../components/Calendar';

export default function CalendarView(props) {
    return (
        <Calendar classInfo={props.classInfo}/>
    );
}