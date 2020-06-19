import React, { Fragment } from 'react';
import { useParams } from "react-router-dom";
import SearchCalendar from './SearchCalendar';
import SearchOptions from './SearchOptions';
import SearchPanel from './SearchPanel';
import SearchResult from "./SearchResult";

function Search() {
    let params = useParams();
    return (
        <Fragment>
            <section className="banner_area">
                <div className="breadcrumb_area blog_banner_two">
                    <div className="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background=""></div>
                    <div className="container">
                        <div className="page-cover text-center">
                            <h2 className="page-cover-tittle f_48">Search</h2>
                        </div>
                    </div>
                </div>
                <SearchPanel {...params} timestamp={new Date().getTime()} autoRefresh={true} />
            </section>
            <section className="narrow_gap">
                <SearchCalendar {...params} />
                <SearchOptions />
                <SearchResult {...params} />
            </section>
        </Fragment>
    )
}

export default Search;
