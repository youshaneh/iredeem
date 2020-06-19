import React, { useEffect, useState, useContext } from 'react';
import { getMileageRequirement } from './utils.js'
import './SearchResult.scss';
import CenterSpinner from './widget/CenterSpinner.js';
import { SearchOptionContext, } from './Contexts.js'
import { Collapse } from 'react-bootstrap';

function SearchResult(props) {
    const [itineraries, setItineraries] = useState(props.date ? undefined : []);
    useEffect(() => {
        if (!(props.departure && props.arrival && props.date)) return;
        setItineraries(undefined);
        let selectedDay = new Date(props.date);
        let nextDay = new Date(selectedDay.getTime() + 24 * 60 * 60 * 1000);
        fetch(`https://iredeem-server.herokuapp.com/itinerary?departure=${props.departure}&arrival=${props.arrival}&since=${selectedDay.toISOString().split('T')[0]}&till=${nextDay.toISOString().split('T')[0]}`, { method: 'get' })
            .then(function (response) {
                if (!response.ok) throw new Error(response.statusText)
                return response.json();
            })
            .then(function (responseJson) {
                responseJson.sort((a, b) => new Date(a.flight1.departureTime).getTime() - new Date(b.flight1.departureTime).getTime());
                setItineraries(responseJson);
            })
            .catch(function (err) {
                console.error(err);
            })
    }, [props.departure, props.arrival, props.date]);
    let content;
    if (props.date) {
        content = itineraries ?
            itineraries.map(itinerary =>
                <ResultItem key={itinerary.itineraryId} itinerary={itinerary} cabin={props.cabin} />) :
            <div className="loading"><CenterSpinner /></div>
    }
    return (
        <section className="result_area">
            <div className="container">
                <div className="row">
                    <div className="col">
                        {content}
                    </div>
                </div>
            </div>
        </section>
    )
}

function ResultItem(props) {
    let { flight1, flight2 } = props.itinerary;
    let isAvailable = !isNaN(flight1[`status${props.cabin}`]) && (!flight2 || !isNaN(flight2[`status${props.cabin}`]));
    const { nonStopOnly, availableOnly } = useContext(SearchOptionContext);
    return (
        <Collapse in={!(nonStopOnly && flight2) && !(availableOnly && !isAvailable)}>
            <div className={`result-item ${isAvailable ? '' : 'not-available'}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-md">
                            <div className="flight-number-row">
                                <FlightNumber flight={flight1} />
                                {flight2 && <span className="arrow">→</span>}
                                {flight2 && <FlightNumber flight={flight2} />}
                            </div>
                            <div className="flight-info-row">
                                <Terminal time={flight1.departureTime} airport={flight1.departureAirport} />
                                <span className="flight" />
                                {flight2 &&
                                    <span className="stopover">
                                        <div>
                                            <span className="dot"></span>
                                        </div>
                                        <div className="airport">
                                            {flight2.departureAirport}
                                        </div>
                                    </span>}
                                {flight2 && <span className="flight" />}
                                <Terminal time={flight2?.arrivalTime || flight1?.arrivalTime} airport={flight2?.arrivalAirport || flight1?.arrivalAirport} />
                            </div>
                        </div>
                        <div className="col-md-2 center">
                            <div className="d-md-none padding"></div>
                            <div className="mileage-requirement">
                                <span className="mileage">{getMileageRequirement(flight1, flight2, props.cabin)}</span>
                                <span className="unit">miles</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Collapse>
    );
}

function FlightNumber(props) {
    return (
        <div className="flight-number">
            <img className="airline-logo" alt={props.flight.airline} src={`${process.env.PUBLIC_URL}/image/logo/${props.flight.airline}.png`} />
            <span>{props.flight.airline + props.flight.flightNumber}</span>
        </div>
    );
}

function Terminal(props) {
    return (
        <span>
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

export default SearchResult;
