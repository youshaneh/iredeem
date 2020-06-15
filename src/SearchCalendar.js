import React, { useEffect, useState } from 'react';
import { NavLink, useRouteMatch } from "react-router-dom";
import './SearchCalendar.scss';
import { weekdayLabels, getLocalDateString } from './utils';
import CenterSpinner from './CenterSpinner.js';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

function SearchCalendar(props) {
    const [fitstMonthDateTime, setFitstMonthDateTime] = useState(new Date().getTime());
    let date = new Date(fitstMonthDateTime)
    let thisMonth = getLocalDateString(date).substring(0, 7);
    date.setMonth(date.getMonth() + 1);
    let nextMonth = getLocalDateString(date).substring(0, 7);
    function changeMonth(offset){
        let newMonthDate = new Date(fitstMonthDateTime)
        newMonthDate.setMonth(newMonthDate.getMonth() + offset);
        setFitstMonthDateTime(newMonthDate.getTime());
    }
    return (
        <section className="subsection_gap">
            <div className="arrow-container">
                <div className="arrow-span" onClick={() => changeMonth(-1)}>
                    <RiArrowLeftSLine className="arrow" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md">
                            <CalendarMonth month={thisMonth} {...props} />
                        </div>
                        <div className="d-none d-md-block col-md">
                            <CalendarMonth month={nextMonth} {...props} />
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="arrow-span" onClick={() => changeMonth(1)}>
                    <RiArrowRightSLine className="arrow" />
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
        if (!props.departure || !props.arrival) {
            setAvailabilities([]);
            return;
        }
        else {
            setAvailabilities(undefined);
        }
        fetch(`https://iredeem-server.herokuapp.com/availability?departure=${props.departure}&arrival=${props.arrival}&since=${getLocalDateString(new Date())}&till=${getLocalDateString(firstDayNextMonth)}`, { method: 'get' })
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
    }, [props.departure, props.arrival, props.month]);

    return (
        <div className="calendar-month">
            <h5 className="calendar-month-header">{firstDay.toLocaleString('default', { month: 'long' })}</h5>
            {weekdayLabels.map((label, index) => <div key={index} className="weekday-label">{label}</div>)}
            {availabilities == undefined && <div className="loading"><CenterSpinner /></div>}
            {dates.map((calendarDate, index) => <CalendarDate key={index} calendarDate={calendarDate} available={availabilities && availabilities[calendarDate && getLocalDateString(calendarDate)]?.[props.cabin]} {...props} />)}
        </div>
    );
}

function CalendarDate(props) {
    return (
        <div className={`calendar-day ${props.calendarDate ? 'active ' : ''} ${props.available ? 'available ' : ''}`}>
            {props.calendarDate && (
                (props.departure && props.arrival && props.cabin) ?
                    (<NavLink to={`/search/${props.departure}/${props.arrival}/${props.cabin}/${getLocalDateString(props.calendarDate)}`} activeClassName="selected">
                        {props.calendarDate.getDate()}
                    </NavLink>) :
                    (<span>
                        {props.calendarDate.getDate()}
                    </span>))
            }
        </div>
    );
}

export default SearchCalendar;
