import React, { Fragment, useEffect } from 'react';
import { useParams } from "react-router-dom";
import SearchCalendar from '../components/search/SearchCalendar';
import SearchOptions from '../components/search/SearchOptions';
import SearchPanel from '../components/common/SearchPanel';
import SearchResult from "../components/search/SearchResult";
import './Search.scss';

function Search() {
  const params = useParams();
  useEffect(() => {
    if (params.departure && params.arrival && params.cabin && !params.date) {
      let top = document.querySelector('#searchCalendar').offsetTop - (document.querySelector('.header_area')?.offsetHeight);
      window.scrollTo({
        top,
        left: 0,
        behavior: 'smooth'
      });
    }
    // eslint-disable-next-line
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
