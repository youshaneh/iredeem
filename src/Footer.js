import React from 'react';
import { Link } from "react-router-dom";
import { onLinkSelect } from './utils'

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
                    <p className="col-12 footer-text">
                        Copyright &copy; 2020 <Link to="/" onClick={onLinkSelect}>iRedeem</Link> | Design by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
