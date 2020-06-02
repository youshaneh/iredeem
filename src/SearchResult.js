import React from 'react';
import Calendar from './Calendar';

function SearchResult(props) {
    let date = new Date();
    let thisMonth = date.toISOString().substring(0, 7);
    date.setMonth(date.getMonth() + 1);
    let nextMonth = date.toISOString().substring(0, 7);
    return (
        <section className="about_history_area section_gap">
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <Calendar month={thisMonth} departure={props.departure} arrival={props.arrival} />
                    </div>
                    <div className="col-md">
                        <Calendar month={nextMonth} departure={props.departure} arrival={props.arrival} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchResult;
