import React, { useContext } from 'react';
import './SearchOptions.scss';
import { SearchOptionContext } from './Contexts.js'

function SearchOptions(props) {
    const { nonStopOnly, setNonStopOnly, availableOnly, setAvailableOnly } = useContext(SearchOptionContext);
    return (
        <section className="narrow_gap">
            <div className="container">
                <div className="row">
                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="option" >
                            <span>Available Only</span>
                            <div className="primary-switch">
                                <input type="checkbox" id="available-only"
                                    checked={availableOnly}
                                    onChange={(e) => setAvailableOnly(e.target.checked)} />
                                <label htmlFor="available-only"></label>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="option" >
                            <span>Nonstop Only</span>
                            <div className="primary-switch">
                                <input type="checkbox" id="non-stop-only"
                                    checked={nonStopOnly}
                                    onChange={(e) => setNonStopOnly(e.target.checked)} />
                                <label htmlFor="non-stop-only"></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchOptions;
