import React, { useState, useEffect } from 'react';
import './Calendar.scss';

const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function Calendar(props) {
    let dates = [];
    let firstDay = new Date(props.month + '-01');
    let firstDayNextMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 1);

    const [availabilities, setAvailabilities] = useState();

    for (let i = 0; i < firstDay.getDay(); i++) dates.push(null);
    for (let date = new Date(firstDay.getTime()); date.getMonth() == firstDay.getMonth(); date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date.getTime()));
    }
    for (let i = firstDayNextMonth.getDay() || 7; i < 7; i++) dates.push(null);

    useEffect(() => {
        fetch(`http://localhost:8080/availability?departure=${props.departure}&arrival=${props.arrival}&since=${firstDay.toISOString().split('T')[0]}&till=${firstDayNextMonth.toISOString().split('T')[0]}`, { method: 'get' })
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
    }, [props.departure, props.arrival]);

    return (
        <div className="container">
            <div className="calendar-month">
                <h5 className="calendar-month-header">{firstDay.toLocaleString('default', { month: 'long' })}</h5>
                {weekdayLabels.map((label, index) => <div key={index} className="weekday-label">{label}</div>)}
                {dates.map((date, index) => <CalendarDate key={index} date={date} available={availabilities && availabilities[date && date.toISOString().split('T')[0]]} />)}
            </div>
        </div>
    );
}

function CalendarDate(props) {
    return (
        <div className={`calendar-day ${props.date ? 'active ' : ''}  ${props.available ? 'available ' : ''}`}>
            {props.date && props.date.getDate()}
        </div>
    );
}

export default Calendar;
