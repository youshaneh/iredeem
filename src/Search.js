import React, { Fragment } from 'react';
import SearchPanel from './SearchPanel';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Search() {
    const { pathname } = useLocation();  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
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
                <SearchPanel />
            </section>
            <section className="about_history_area section_gap">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d_flex align-items-center">
                            <div className="about_content ">
                                <h2 className="title title_color">About Us <br />Our History<br />Mission & Vision</h2>
                                <p>inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct standards especially in the workplace. That’s why it’s crucial that, as women, our behavior on the job is beyond reproach. inappropriate behavior is often laughed.</p>
                                <a href="#" className="button_hover theme_btn_two">Request Custom Price</a>
                            </div>
                        </div>
                        <div className="col-md-6">
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Search;
