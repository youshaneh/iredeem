import React, { useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { NavLink } from "react-router-dom";
import CenterSpinner from './widget/CenterSpinner.js';
import './SearchCalendar.scss';
import { getLocalDateString, weekdayLabels } from './utils';
import { environment } from './environment.js'

function SearchCalendar(props) {
    const [dateTimeInFirstMonth, setDateTimeInFirstMonth] = useState(new Date().getTime());
    let date = new Date(dateTimeInFirstMonth)
    let firstMonth = getLocalDateString(date).substring(0, 7);
    date.setMonth(date.getMonth() + 1);
    let secondMonth = getLocalDateString(date).substring(0, 7);
    function changeMonth(offset) {
        let newDateInFirstMonth = new Date(dateTimeInFirstMonth)
        newDateInFirstMonth.setMonth(newDateInFirstMonth.getMonth() + offset);
        setDateTimeInFirstMonth(newDateInFirstMonth.getTime());
    }

    const [availabilities, setAvailabilities] = useState({});
    let { departure, arrival } = props;
    if (availabilities.departure !== departure ||
        availabilities.arrival !== arrival) {
        setAvailabilities({ departure, arrival });
    }
    useEffect(() => {
        function update(month) {
            if (availabilities[month]) return;
            let firstDay = (new Date(month) < new Date()) ? new Date() : new Date(month);
            let firstDayNextMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 1);
            fetch(`${environment.baseUrl}/availability?departure=${departure}&arrival=${arrival}&since=${getLocalDateString(firstDay)}&till=${getLocalDateString(firstDayNextMonth)}`, { method: 'get' })
                .then(function (response) {
                    if (!response.ok) throw new Error(response.statusText);
                    return response.json();
                })
                .then(function (responseJson) {
                    setAvailabilities(availabilities => ({ ...availabilities, [month]: responseJson }));
                })
                .catch(function (err) {
                    console.error(err);
                })
        }
        update(firstMonth);
        update(secondMonth);
    }, [departure, arrival, firstMonth, secondMonth, availabilities]);

    return (
        <section id="searchCalendar">
            <div className="arrow-container">
                <div className="arrow-span" onClick={() => changeMonth(-1)}>
                    <RiArrowLeftSLine className="arrow" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md">
                            <CalendarMonth month={firstMonth} availabilities={!(departure && arrival) ? [] : availabilities[firstMonth]} {...props} />
                        </div>
                        <div className="d-none d-md-block padding-between-month"></div>
                        <div className="d-none d-md-block col-md">
                            <CalendarMonth month={secondMonth} availabilities={!(departure && arrival) ? [] : availabilities[secondMonth]} {...props} />
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
    for (let i = 0; i < firstDay.getDay(); i++) dates.push(null);
    for (let date = new Date(firstDay.getTime()); date.getMonth() === firstDay.getMonth(); date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date.getTime()));
    }
    for (let i = firstDayNextMonth.getDay() || 7; i < 7; i++) dates.push(null);
    return (
        <div className="calendar-month">
            <h4 className="calendar-month-header">{firstDay.toLocaleString('default', { month: 'long' })}</h4>
            {weekdayLabels.map((label, index) => <div key={index} className="weekday-label">{label}</div>)}
            {props.availabilities === undefined && <div className="loading"><CenterSpinner /></div>}
            {dates.map((calendarDate, index) => {
                let available = calendarDate && props.availabilities && props.availabilities[getLocalDateString(calendarDate)]?.[props.cabin];
                return <CalendarDate key={props.month + index} calendarDate={calendarDate} available={available} {...props} />
            })}
        </div>
    );
}

function CalendarDate(props) {
    const past = props.calendarDate && props.calendarDate < new Date();
    return (
        <div className={`calendar-day ${past ? 'past' : ''} ${props.calendarDate ? 'active ' : ''} ${props.available ? 'available ' : ''}`}>
            {props.calendarDate && (
                (props.departure && props.arrival && props.cabin) ?
                    past ?
                        <span>{props.calendarDate.getDate()}</span> :
                        <NavLink to={`/search/${props.departure}/${props.arrival}/${props.cabin}/${getLocalDateString(props.calendarDate)}`}
                            activeClassName="selected"
                            onClick={() => {
                                let minTop = document.querySelector('#searchCalendar').offsetTop - (document.querySelector('.header_area')?.offsetHeight);
                                if (window.pageYOffset < minTop) {
                                    window.scrollTo({
                                        top: minTop,
                                        left: 0,
                                        behavior: 'smooth'
                                    });
                                }
                            }}>
                            {props.calendarDate.getDate()}
                        </NavLink> :
                    <span onClick={() => {
                        window.scrollTo({
                            top: document.querySelector('.hotel_booking_area').offsetTop - (document.querySelector('.header_area')?.offsetHeight),
                            left: 0,
                            behavior: 'smooth'
                        });
                    }}>
                        {props.calendarDate.getDate()}
                    </span>)
            }
        </div>
    );
}

export default SearchCalendar;
