import React from 'react';
import './SearchOptions.scss';
import { connect } from 'react-redux'
import { setNonstopOnly, setAvailableOnly } from '../../redux/actions'

function SearchOptions(props) {
  return (
    <section className="narrow_gap">
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-4 col-lg-3">
            <div className="option" >
              <span>Available Only</span>
              <div className="primary-switch">
                <input type="checkbox" id="available-only"
                  checked={props.availableOnly}
                  onChange={(e) => props.setAvailableOnly(e.target.checked)} />
                <label htmlFor="available-only"></label>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="option" >
              <span>Nonstop Only</span>
              <div className="primary-switch">
                <input type="checkbox" id="non-stop-only"
                  checked={props.nonstopOnly}
                  onChange={(e) => props.setNonstopOnly(e.target.checked)} />
                <label htmlFor="non-stop-only"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = ({ nonstopOnly, availableOnly }) => ({ nonstopOnly, availableOnly });

export default connect(mapStateToProps, { setNonstopOnly, setAvailableOnly })(SearchOptions);
