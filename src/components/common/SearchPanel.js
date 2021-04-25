import React, { useEffect, useState, useContext, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from "react-router-dom";
import airports from '../../airports.json';
import './SearchPanel.scss';
import { RouteContext } from '../../context/Contexts.js'

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
    let allOptions = [Array.from(departures), Array.from(arrivals)]

    function hasOption({ departure, arrival }) {
        if (departure !== undefined && arrival !== undefined) throw new Error('leave either departure or arrival undefined to check if the value of the other field is in the option list')
        let selectedValue = departure ? departure : arrival;
        let selectedIndex = departure ? 0 : 1;
        return allOptions[selectedIndex].includes(selectedValue);
    }

    function getCorrespondingOptions({ departure, arrival }) {
        if (!(departure !== undefined ^ arrival !== undefined)) throw new Error('leave either departure or arrival undefined to get available options for the field')
        let selectedValue = (departure !== undefined) ? departure : arrival;
        let selectedIndex = (selectedValue === departure) ? 0 : 1;
        let optionIndex = 1 - selectedIndex;
        return hasOption({ departure, arrival }) ?
            routes?.flatMap(route => (route[selectedIndex] === selectedValue) ? [route[optionIndex]] : [])
            : allOptions[optionIndex];
    }

    let departureOptions = getCorrespondingOptions({ arrival });
    let arrivalOptions = getCorrespondingOptions({ departure })

    let isDepartureValid = departureOptions.includes(departure);
    let isArrivalValid = arrivalOptions.includes(arrival);

    const [showWarning, setShowWarning] = useState(false);
    const history = useHistory();
    function search() {
        setShowWarning(true);
        if (isDepartureValid && isArrivalValid) history.push(`/search/${departure}/${arrival}/${cabin}`);
    }

    useEffect(() => {
        if (props.autoRefresh) search();
        // eslint-disable-next-line
    }, [departure, arrival, cabin]);

    const [timestamp, setTimestamp] = useState({});
    if (timestamp !== props.timestamp) {
        setTimestamp(props.timestamp);
        setDeparture(props.departure || '');
        setArrival(props.arrival || '');
        setCabin(props.cabin || 'B');
    }

    const refs = [useRef(null), useRef(null), useRef(null)];

    return (
        <SearchPannelFrame onEnter={() => {
            for (let i = 0; i < refs.length - 1; i++) {
                if (document.activeElement === refs[i].current){
                    refs[i + 1].current.focus();
                    break;
                }
            }
        }}>
            <AutoCompleteInput ref={refs[0]} value={departure} routes={routes} warn={showWarning && !isDepartureValid}
                updateFunction={setDeparture} validOptions={departureOptions} allOptions={allOptions[0]}
                placeholder="Where from?" invalidMsg=" - Not applicable" />
            <AutoCompleteInput ref={refs[1]} value={arrival} routes={routes} warn={showWarning && !isArrivalValid}
                updateFunction={setArrival} validOptions={arrivalOptions} allOptions={allOptions[1]}
                placeholder="Where to?" invalidMsg=" - Not applicable" />
            <div className="col-md item">
                <select className="wide nice-select" value={cabin} id="cabin"
                    ref={refs[2]}
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
                        <a className="theme_btn button_hover stretch" href="/search" onClick={(e) => {
                            e.preventDefault();
                            search();
                        }}>Search</a>
                    </div>
                </div>
            }
        </SearchPannelFrame>
    )
}

const AutoCompleteInput = React.forwardRef((props, ref) => {
    const [focused, setFocused] = useState(false);
    const allOptions = props.allOptions ? props.allOptions.filter(option => option.indexOf(props.value.toUpperCase()) >= 0) : [];
    const validOptions = props.validOptions ? props.validOptions.filter(option => option.indexOf(props.value.toUpperCase()) >= 0) : [];
    const invalidOptions = allOptions.flatMap(option => validOptions.includes(option) ? [] : [option]);
    return (
        <div className="col-md item">
            {props.routes !== undefined || <Spinner className="spinner" animation="border" variant="primary" size="sm" />}
            <input className={`wide form-control nice-select ${props.warn ? 'invalid' : ''}`}
                value={props.value}
                ref={ref}
                placeholder={(props.routes !== undefined) ? props.placeholder : 'Loading...'}
                onFocus={e => {
                    e.target.select();
                    setFocused(true);
                }}
                onBlur={() => {
                    if (validOptions.length === 1 && props.value.length > 0) props.updateFunction(validOptions[0]);
                    setFocused(false)
                }}
                onChange={e => {
                    props.updateFunction(e.target.value);
                    if (props.validOptions.includes(e.target.value)) e.target.blur();
                }} />
            <div className={`options ${focused ? '' : 'hide'}`}>
                <div className="border">
                    {validOptions.map(option =>
                        <div className="airport-option" key={option}
                            onMouseDown={() => {
                                props.updateFunction(option);
                            }}>
                            <div className="airport">{option}</div>
                            <div className="details">{airports[option].city}</div>
                        </div>)}
                    {invalidOptions.map(option =>
                        <div className="airport-option invalid" key={option}>
                            <div className="airport">{option + props.invalidMsg}</div>
                            <div className="details">{airports[option].city}</div>
                        </div>)}
                </div>
            </div>
        </div>
    );
});

function SearchPannelFrame(props) {
    return (
        <div className="hotel_booking_area position">
            <div className="container">
                <div className="hotel_booking_table">
                    <div className="book_tabel_item"
                        onKeyUp={e => {
                            (e.keyCode === 13) && props.onEnter()
                        }}>
                        <div className="row">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SearchPanel;
