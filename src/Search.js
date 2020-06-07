import React, { Fragment, useEffect } from 'react';
import { useParams } from "react-router-dom";
import SearchPanel from './SearchPanel';
import SearchResult from "./SearchResult";
import SearchCalendar from './SearchCalendar';

function Search() {
    let params = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                <SearchPanel {...params} autoRefresh={true} />
            </section>

            <section className="about_history_area subsection_gap">
                <SearchCalendar {...params} />
                <SearchResult {...params} />
            </section>
        </Fragment>
    )
}

export default Search;
