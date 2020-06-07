import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import './SearchPanel.scss';

function SearchPanel(props) {
    const [departure, setDeparture] = useState(props.departure || '');
    const [arrival, setArrival] = useState(props.arrival || '');
    const [cabin, setCabin] = useState(props.cabin || 'FIR');

    const [routes, setRoutes] = useState();
    let departures = new Set();
    let arrivals = new Set();
    routes && routes.forEach(route => {
        departures.add(route[0]);
        arrivals.add(route[1]);
    });
    let options = [Array.from(departures), Array.from(arrivals)]

    useEffect(() => {
        fetch(`https://iredeem-server.herokuapp.com/routes`, { method: 'get' })
            .then(function (response) {
                if (!response.ok) throw new Error(response.statusText)
                return response.json();
            })
            .then(function (responseJson) {
                setRoutes(responseJson);
            })
            .catch(function (err) {
                console.error(err);
            })
    }, [props.departure, props.arrival]);

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
    function search() {
        setShowWarning(true);
        if (isDepartureValid && isArrivalValid) history.push(`/search/${departure}/${arrival}/${cabin}`);
    }

    return (
        <div className="hotel_booking_area position">
            <div className="container">
                <div className="hotel_booking_table">
                    <div className="book_tabel_item">
                        <div className="row">
                            <div className="col-md">
                                <input className={`wide form-control nice-select ${(showWarning && !isDepartureValid) ? 'invalid' : ''}`}
                                    placeholder="Where departure?"
                                    autoComplete="off"
                                    list="departures" name="departure" id="departure" value={departure}
                                    onChange={e => {
                                        setDeparture(e.target.value);
                                        setShowWarning(false);
                                    }}
                                    onBlur={props.autoRefresh && search} />
                                <datalist id="departures">
                                    {departureOptions?.map(
                                        option => <option key={option} value={option} />)}
                                </datalist>
                            </div>
                            <div className="col-md">
                                <input className={`wide form-control nice-select ${(showWarning && !isArrivalValid) ? 'invalid' : ''}`}
                                    placeholder="Where to?"
                                    autoComplete="off"
                                    list="arrivals" name="arrival" id="arrival" value={arrival}
                                    onChange={e => {
                                        setArrival(e.target.value);
                                        setShowWarning(false);
                                    }}
                                    onBlur={props.autoRefresh && search} />
                                <datalist id="arrivals">
                                    {arrivalOptions?.map(
                                        option => <option key={option} value={option} />)}
                                </datalist>
                            </div>
                            <div className="col-md">
                                <select className="wide nice-select" value={cabin}
                                    onChange={e => {
                                        setCabin(e.target.value);
                                    }}
                                    onBlur={props.autoRefresh && search}>
                                    <option value="F">First</option>
                                    <option value="B">Business</option>
                                    <option value="N">Premium Economy</option>
                                    <option value="R">Economy</option>
                                </select>
                            </div>
                            {!props.autoRefresh &&
                                <div className="col-md-2">
                                    <div className="book_tabel_item">
                                        <a className="book_now_btn button_hover" onClick={search}>Search</a>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPanel;
