import React, { useEffect, useState } from 'react';
import { getMileageRequirement } from '../../utils/utils.js'
import '../search/SearchResult.scss';
import CenterSpinner from '../common/CenterSpinner.js';
import { Collapse } from 'react-bootstrap';
import { environment } from '../../environment.js'
import { connect } from 'react-redux'
import { getTimezone } from 'countries-and-timezones';
import airports from '../../airports.json';
import AsyncButton from '../common/AsyncButton';
import { pushNotification } from '../../redux/actions'

export default function SearchResultItem({ itinerary: { flight1, flight2 }, isAvailable, cabin, button }) {
  let lastFlight = flight2 || flight1;
  let departureTimezoneOffest = getTimezone(airports[flight1.departureAirport].tz).utcOffset;
  let arrivalTimezoneOffest = getTimezone(airports[lastFlight.arrivalAirport].tz).utcOffset;
  let timeDiffInMin = departureTimezoneOffest - arrivalTimezoneOffest;
  let TravelTimeInMin = (new Date(lastFlight.arrivalTime) - new Date(flight1.departureTime)) / (60 * 1000) + timeDiffInMin;
  return (
    <div className="result-item">
      <div className={`result-item-content ${isAvailable ? '' : 'not-available'}`}>
        <div className="container">
          <div className="row">
            <div className="col-md fade-when-not-available">
              <div className="flight-number-row">
                <FlightNumber flight={flight1} />
                {flight2 && <><span className="arrow">→</span><FlightNumber flight={flight2} /></>}
              </div>
              <div className="flight-info-row">
                <Terminal time={flight1.departureTime} airport={flight1.departureAirport} />
                <div className="course">
                  <div className="duration">{`${parseInt(TravelTimeInMin / 60)}hr ${TravelTimeInMin % 60}min`}</div>
                  <div className="legs">
                    <span className="leg" />
                    {flight2 &&
                      <span className="stopover">
                        <div>
                          <span className="dot"></span>
                        </div>
                        <div className="airport">
                          {flight2.departureAirport}
                        </div>
                      </span>}
                    {flight2 && <span className="leg" />}
                  </div>
                </div>
                <Terminal time={flight2?.arrivalTime || flight1?.arrivalTime} airport={flight2?.arrivalAirport || flight1?.arrivalAirport} />
              </div>
            </div>
            <div className="col-md-3 col-xl-2 row m-0 p-0 center">
              <div className="mileage-requirement col-5 col-md-12 m-0 fade-when-not-available">
                <span className="mileage">{getMileageRequirement(flight1, flight2, cabin)}</span>
                <span className="unit">miles</span>
              </div>
              <div className="col-7 col-md-12 m-0">{button}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlightNumber(props) {
  return (
    <div className="flight-number">
      <img className="airline-logo" alt={props.flight.airline} src={`${process.env.PUBLIC_URL}/images/logo/${props.flight.airline}.png`}
        onError={(e) => {
          let fallback = `${process.env.PUBLIC_URL}/images/logo/oneworld.png`;
          if (e.target.src != fallback) e.target.src = fallback;
        }} />
      <span>{props.flight.airline + props.flight.flightNumber}</span>
    </div>
  );
}

function Terminal(props) {
  return (
    <span className="terminal-container">
      <div className="terminal">
        <div className="time">
          {props.time.match(/T(\d{2}:\d{2})/)[1]}
        </div>
        <div className="airport">
          {props.airport}
        </div>
      </div>
    </span>
  );
}