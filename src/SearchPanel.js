import React, { Fragment } from 'react';

function SearchPanel() {
    return (
        <div className="hotel_booking_area position">
            <div className="container">
                <div className="hotel_booking_table">
                    <div className="book_tabel_item">
                        <div className="row">
                            <div className="col-md">
                                <input className="wide form-control" placeholder="Where from?" list="froms" name="from" id="from" />
                                <datalist id="froms">
                                    <option value="Edge" />
                                    <option value="Firefox" />
                                    <option value="Chrome" />
                                    <option value="Opera" />
                                    <option value="Safari" />
                                </datalist>
                            </div>
                            <div className="col-md">
                                <input className="wide form-control" placeholder="Where to?" list="tos" name="to" id="to" />
                                <datalist id="tos">
                                    <option value="Edge" />
                                    <option value="Firefox" />
                                    <option value="Chrome" />
                                    <option value="Opera" />
                                    <option value="Safari" />
                                </datalist>
                            </div>
                            <div className="col-md">
                                <select className="wide nice-select">
                                    <option data-display="Child">Number of Rooms</option>
                                    <option value="1">Room 01</option>
                                    <option value="2">Room 02</option>
                                    <option value="3">Room 03</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <div className="book_tabel_item">
                                    <a className="book_now_btn button_hover" href="#">Search</a>
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
