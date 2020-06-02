import React, { useState } from 'react';
import { Link } from "react-router-dom";

function SearchPanel(props) {
    const [departure, setDeparture] = useState(props.departure);
    const [arrival, setArrival] = useState(props.arrival);
    const [cabin, setCabin] = useState(props.cabin);
    return (
        <div className="hotel_booking_area position">
            <div className="container">
                <div className="hotel_booking_table">
                    <div className="book_tabel_item">
                        <div className="row">
                            <div className="col-md">
                                <input className="wide form-control" placeholder="Where departure?"
                                    list="departures" name="departure" id="departure" value={departure || ""}
                                    onChange={e => setDeparture(e.target.value)} />
                                <datalist id="departures">
                                    <option value="HKG" />
                                    <option value="TPE" />
                                </datalist>
                            </div>
                            <div className="col-md">
                                <input className="wide form-control" placeholder="Where to?"
                                    list="arrivals" name="arrival" id="arrival" value={arrival || ""}
                                    onChange={e => setArrival(e.target.value)} />
                                <datalist id="arrivals">
                                    <option value="KIX" />
                                    <option value="NRT" />
                                </datalist>
                            </div>
                            <div className="col-md">
                                <select className="wide nice-select" value={cabin || ""}
                                    onChange={e => setCabin(e.target.value)}>
                                    <option value="FIR">First</option>
                                    <option value="BUS">Business</option>
                                    <option value="PEY">Premium Economy</option>
                                    <option value="ECO">Economy</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <div className="book_tabel_item">
                                    <Link to={`/search/${departure}/${arrival}/${cabin}`} className="book_now_btn button_hover">Search</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPanel;
