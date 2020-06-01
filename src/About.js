import React, { Fragment } from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function About() {
    const { pathname } = useLocation();  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <Fragment>
            <section class="breadcrumb_area">
                <div class="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background=""></div>
                <div class="container">
                    <div class="page-cover text-center">
                        <h2 className="page-cover-tittle f_48">About Us</h2>
                    </div>
                </div>
            </section>
            <section class="about_history_area section_gap">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 d_flex align-items-center">
                            <div class="about_content ">
                                <h2 class="title title_color">About Us Our History Mission & Vision</h2>
                                <p>inappropriate behavior is often laughed off as “boys will be boys,” women face higher conduct standards especially in the workplace. That’s why it’s crucial that, as women, our behavior on the job is beyond reproach. inappropriate behavior is often laughed.</p>
                                <a href="#" class="button_hover theme_btn_two">Request Custom Price</a>
                            </div>
                        </div>
                        <div class="col-md-6">
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default About;
