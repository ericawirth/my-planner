import React, { useState, useEffect, useCallback } from 'react';


export default function ClassList(props) {
    let classItem = props.classItem;

    return (
        <div>
            <div className="columns mt-2 mb-0 p-0">
                <div className="column is-one-quarter"></div>
                <div className="column is-half">
                    <h4 className="title is-4">{classItem.classTitle}</h4>
                </div>
                <div className="column is-one-quarter">
                    <button id={classItem.id} className="delete" onClick={props.doDelete}>Remove</button>
                </div>
            </div>
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth mt-2">
                <tbody>
                    <tr>
                        <td>Professor</td>
                        <td>{classItem.classProfessor}</td>
                    </tr>
                    <tr>
                        <td>Schedule</td>
                        <td>{classItem.classSchedule}</td>
                    </tr>
                    <tr>
                        <td>Zoom</td>
                        <td>{classItem.classZoom}</td>
                    </tr>
                    <tr>
                        <td>Color</td>
                        <td>{classItem.color}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}