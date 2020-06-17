import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer-area section_gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12  col-md-12 col-sm-12">
                        <div className="single-footer-widget">
                            <h6 className="footer_title">About the data</h6>
                            <p>
                                We try our best to keep the data up to date.
                                However, the award ticket status is subject to change.
                                In case of any inconsistency, the information shown on <a href="https://www.asiamiles.com" target="_blank" rel="noopener noreferrer" >asiamiles.com</a> shall prevail.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="border_line"></div>
                <div className="row footer-bottom d-flex justify-content-between align-items-center">
                    <p className="col-lg-8 col-sm-12 footer-text m-0">
                        Copyright &copy; All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
