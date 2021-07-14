import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { environment } from '../../environment.js'
import { connect } from 'react-redux'
import { setToken, setUserInfo, pushNotification } from '../../redux/actions'
import './account.scss';
import SearchResultItem from '../common/SearchResultItem';
import AsyncButton from '../common/AsyncButton';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WithHeightValueDiv from '../common/WithHeightValueDiv.js'
import {getCabinNameFromCode} from '../../utils/utils.js'

function MyFlight({ userId, token, setUserInfo, pushNotification }) {
  const [trackings, setTrackings] = useState(undefined);
  useEffect(() => {
    fetch(`${environment.baseUrl}/tracking`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(function (response) {
        if (!response.ok) throw new Error(response.statusText)
        return response.json();
      })
      .then(function (responseJson) {
        setTrackings(responseJson);
      })
      .catch(function (err) {
        console.error(err);
      })
  }, [userId, token]);

  let content = trackings ?
    <TransitionGroup>{
      trackings.map(tracking => {
        let { itinerary, itinerary: { flight1, flight2 }, id, cabin } = tracking;
        let isAvailable = !isNaN(flight1[`status${cabin}`]) && (!flight2 || !isNaN(flight2[`status${cabin}`]));
        function removeFromTracking() {
          return (async () => {
            try {
              let response = await fetch(`${environment.baseUrl}/tracking/${id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              if (!response.ok) {
                throw new Error((await response.json()).message)
              }
              setTrackings(trackings.filter(e => e.id !== id));
              pushNotification({
                header: 'Track',
                body: 'Remove from tracking list successfully.'
              })
            }
            catch (e) {
              pushNotification({
                header: 'Track',
                body: `Fail to remove from tracking list. ${e.message}`
              })
            }
          })();
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(flight1.departureTime);
        return (
          <CSSTransition key={id} timeout={500} classNames="route-transition">
            <WithHeightValueDiv containerClass="tracking-item">
              <div className="my-flight-info">
                <div className="date">{date.toLocaleDateString('en-US', options)}</div>
                <div className="cabin">{getCabinNameFromCode(cabin)}</div>
              </div>
              <SearchResultItem itinerary={itinerary} cabin={cabin} isAvailable={isAvailable}
                button={<AsyncButton onClick={removeFromTracking}>Remove</AsyncButton>}
                delay={500} />
            </WithHeightValueDiv>
          </CSSTransition>
        )
      })}
    </TransitionGroup> :
    <div className="loading"><Spinner animation="border" variant="primary" /></div>

  return (
    <div className="row">
      <div className="col-md-12 align-items-center">
        <div className="about_content ">
          <h2 className="title">My Flights</h2>
          <div className="route-container">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = ({ userId, token }) => ({ userId, token });
export default connect(mapStateToProps, { setToken, setUserInfo, pushNotification })(MyFlight);