import React, { useEffect, useState, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from "react-router-dom";
import airports from './airports.json';
import './SearchPanel.scss';
import { RouteContext } from './Contexts.js'

function SearchPanel(props) {
    const { routes } = useContext(RouteContext);
    const [departure, setDeparture] = useState(props.departure || '');
    const [arrival, setArrival] = useState(props.arrival || '');
    const [cabin, setCabin] = useState(props.cabin || 'B');

    let departures = new Set();
    let arrivals = new Set();
    if (routes) {
        routes.forEach(route => {
            departures.add(route[0]);
            arrivals.add(route[1]);
        });
    }
    let options = [Array.from(departures), Array.from(arrivals)]

    function isValid({ departure, arrival }) {
        if (departure != undefined && arrival != undefined) throw new Error('leave either departure or arrival undefined to check if the other field is valid')
        let fixedValue = departure ? departure : arrival;
        let fixedIndex = departure ? 0 : 1;
        return options[fixedIndex].includes(fixedValue);
    }

    function getAvailableOptions({ departure, arrival }) {
        if (departure != undefined && arrival != undefined) throw new Error('leave either departure or arrival undefined to get available options for the field')
        let fixedValue = (departure != undefined) ? departure : arrival;
        let fixedIndex = (departure != undefined) ? 0 : 1;
        let optionIndex = 1 - fixedIndex;
        return isValid({ departure, arrival }) ?
            routes?.flatMap(route => (route[fixedIndex] == fixedValue) ? [route[optionIndex]] : [])
            : options[optionIndex];
    }

    let departureOptions = getAvailableOptions({ arrival });
    let arrivalOptions = getAvailableOptions({ departure })

    let isDepartureValid = isValid({ departure }) && departureOptions.includes(departure);
    let isArrivalValid = isValid({ arrival }) && arrivalOptions.includes(arrival);

    const [showWarning, setShowWarning] = useState(false);
    let history = useHistory();
    function search(showWarning) {
        setShowWarning(departure || arrival || showWarning);
        if (isDepartureValid && isArrivalValid) history.push(`/search/${departure}/${arrival}/${cabin}`);
    }

    useEffect(() => {
        if (props.autoRefresh) search();
    }, [departure, arrival, cabin]);

    return (
        <SearchPannelArea>
            <div className="col-md item">
                {routes != undefined || <Spinner className="spinner" animation="border" variant="primary" size="sm" />}
                <input className={`wide form-control nice-select ${(showWarning && !isDepartureValid) ? 'invalid' : ''}`}
                    placeholder="Where from?"
                    autoComplete="off"
                    onFocus={e => {
                        setDeparture('');
                    }}
                    list="departures" name="departure" id="departure" value={departure}
                    onChange={e => {
                        setDeparture(e.target.value);
                    }} />
                <datalist id="departures">
                    {departureOptions?.map(
                        option =>
                            <option key={option} value={option}>
                                {airports[option].city + ' - ' + airports[option].name}
                            </option>)}
                </datalist>
            </div>
            <div className="col-md item">
                {routes != undefined || <Spinner className="spinner" animation="border" variant="primary" size="sm" />}
                <input className={`wide form-control nice-select ${(showWarning && !isArrivalValid) ? 'invalid' : ''}`}
                    placeholder="Where to?"
                    autoComplete="off"
                    onFocus={e => {
                        setArrival('');
                    }}
                    list="arrivals" name="arrival" id="arrival" value={arrival}
                    onChange={e => {
                        setArrival(e.target.value);
                    }} />
                <datalist id="arrivals">
                    {arrivalOptions?.map(
                        option =>
                            <option key={option} value={option}>
                                {airports[option].city + ' - ' + airports[option].name}
                            </option>)}
                </datalist>
            </div>
            <div className="col-md item">
                <select className="wide nice-select" value={cabin}
                    onChange={e => {
                        setCabin(e.target.value);
                    }}>
                    <option value="F">First</option>
                    <option value="B">Business</option>
                    <option value="N">Premium Economy</option>
                    <option value="R">Economy</option>
                </select>
            </div>
            {!props.autoRefresh &&
                <div className="col-md-2 item">
                    <div className="book_tabel_item">
                        <a className="book_now_btn button_hover" onClick={() => search(true)}>Search</a>
                    </div>
                </div>
            }
        </SearchPannelArea>
    )
}

function SearchPannelArea(props) {
    return (
        <div className="hotel_booking_area position">
            <div className="container">
                <div className="hotel_booking_table">
                    <div className="book_tabel_item">
                        <div className="row">
                            {props.children};
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPanel;
