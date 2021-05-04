import React, { useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getOffsetMonthString, getLocalDateString, weekdayLabels } from '../../utils/utils';
import { environment } from '../../environment.js'
import CenterSpinner from '../common/CenterSpinner.js';
import './SearchCalendar.scss';

function SearchCalendar(props) {
  const [firstMonth, setFirstMonth] = useState((props.date || getLocalDateString(new Date())).substring(0, 7));
  let secondMonth = getOffsetMonthString(firstMonth, 1);
  function changeMonth(offset) {
    setFirstMonth(getOffsetMonthString(firstMonth, offset));
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
      fetch(`${environment.baseUrl}/availability?departure=${departure}&arrival=${arrival}&since=${getLocalDateString(firstDay)}&till=${getLocalDateString(firstDayNextMonth)}&includeWaitingList=false`, { method: 'get' })
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
        <div className="arrow-span left" onClick={() => changeMonth(-1)}>
          <RiArrowLeftSLine className="arrow" />
        </div>
        <div className="container">
          <TransitionGroup className="months">
            <CSSTransition key={firstMonth} timeout={500} classNames="month">
              <div className="col-md left">
                <CalendarMonth month={firstMonth} availabilities={!(departure && arrival) ? [] : availabilities[firstMonth]} {...props} />
              </div>
            </CSSTransition>
            <CSSTransition key={secondMonth} timeout={500} classNames="month">
              <div className="col-md right">
                <CalendarMonth month={secondMonth} availabilities={!(departure && arrival) ? [] : availabilities[secondMonth]} {...props} />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className="arrow-span right" onClick={() => changeMonth(1)}>
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
  const past = props.calendarDate && props.calendarDate < new Date(getLocalDateString(new Date()).substring(0, 10));
  const available = props.available === 'E' || (props.available === 'Y' && !props.nonstopOnly);
  return (
    <div className={`calendar-day ${past ? 'past' : ''} ${props.calendarDate ? 'active ' : ''} ${available ? 'available ' : ''}`}>
      {props.calendarDate && (
        (props.departure && props.arrival && props.cabin) ?
          past ?
            <span>{props.calendarDate.getDate()}</span> :
            <NavLink to={`/search/${props.departure}/${props.arrival}/${props.cabin}/${getLocalDateString(props.calendarDate)}`}
              activeClassName="selected"
              onClick={() => {
                if(past) return;
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

const mapStateToProps = ({ nonstopOnly, availableOnly }) => ({ nonstopOnly, availableOnly });

export default connect(mapStateToProps)(SearchCalendar);
