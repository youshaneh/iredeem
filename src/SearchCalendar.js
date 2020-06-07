import React, { useEffect, useState } from 'react';
import { NavLink, useRouteMatch } from "react-router-dom";
import './Calendar.scss';
import { weekdayLabels, getLocalDateString } from './utils';

function SearchCalendar(props) {
    let date = new Date();
    let thisMonth = getLocalDateString(date).substring(0, 7);
    date.setMonth(date.getMonth() + 1);
    let nextMonth = getLocalDateString(date).substring(0, 7);
    return (
        <section className="subsection_gap">
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <CalendarMonth month={thisMonth} {...props} />
                    </div>
                    <div className="col-md">
                        <CalendarMonth month={nextMonth} {...props} />
                    </div>
                </div>
                <div>
                </div>
            </div>
        </section>
    )
}

function CalendarMonth(props) {
    let dates = [];
    let firstDay = new Date(props.month);
    let firstDayNextMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 1);

    const [availabilities, setAvailabilities] = useState();

    for (let i = 0; i < firstDay.getDay(); i++) dates.push(null);
    for (let date = new Date(firstDay.getTime()); date.getMonth() == firstDay.getMonth(); date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date.getTime()));
    }
    for (let i = firstDayNextMonth.getDay() || 7; i < 7; i++) dates.push(null);

    useEffect(() => {
        fetch(`https://iredeem-server.herokuapp.com/availability?departure=${props.departure}&arrival=${props.arrival}&since=${getLocalDateString(firstDay)}&till=${getLocalDateString(firstDayNextMonth)}`, { method: 'get' })
            .then(function (response) {
                if (!response.ok) throw new Error(response.statusText)
                return response.json();
            })
            .then(function (responseJson) {
                setAvailabilities(responseJson);
            })
            .catch(function (err) {
                console.error(err);
            })
    }, [props.departure, props.arrival, props.date]);

    return (
        <div className="calendar-month">
            <h5 className="calendar-month-header">{firstDay.toLocaleString('default', { month: 'long' })}</h5>
            {weekdayLabels.map((label, index) => <div key={index} className="weekday-label">{label}</div>)}
            {dates.map((calendarDate, index) => <CalendarDate key={index} calendarDate={calendarDate} available={availabilities && availabilities[calendarDate && getLocalDateString(calendarDate)]?.[props.cabin]} {...props} />)}
        </div>
    );
}

function CalendarDate(props) {
    let match = useRouteMatch();
    return (
        <div className={`calendar-day ${props.calendarDate ? 'active ' : ''} ${props.available ? 'available ' : ''}`}>
            {props.calendarDate && (<NavLink to={`/search/${props.departure}/${props.arrival}/${props.cabin}/${getLocalDateString(props.calendarDate)}`} activeClassName="selected">
                {props.calendarDate.getDate()}
            </NavLink>)}
        </div>
    );
}

export default SearchCalendar;
