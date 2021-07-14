import React, { useEffect, useState } from 'react';
import './SearchResult.scss';
import CenterSpinner from '../common/CenterSpinner.js';
import { Collapse } from 'react-bootstrap';
import { environment } from '../../environment.js'
import { connect } from 'react-redux'
import AsyncButton from '../common/AsyncButton';
import { pushNotification } from '../../redux/actions'
import SearchResultItem from '../common/SearchResultItem';

function SearchResult(props) {
  const [itineraries, setItineraries] = useState(props.date ? undefined : []);
  useEffect(() => {
    if (!(props.departure && props.arrival && props.date)) return;
    let selectedDay = new Date(props.date);
    let nextDay = new Date(selectedDay.getTime() + 24 * 60 * 60 * 1000);
    setItineraries(undefined);
    fetch(`${environment.baseUrl}/itineraries?departure=${props.departure}&arrival=${props.arrival}&since=${selectedDay.toISOString().split('T')[0]}&till=${nextDay.toISOString().split('T')[0]}`, { method: 'get' })
      .then(function (response) {
        if (!response.ok) throw new Error(response.statusText)
        return response.json();
      })
      .then(function (responseJson) {
        responseJson.sort((a, b) => new Date(a.flight1.departureTime).getTime() - new Date(b.flight1.departureTime).getTime());
        setItineraries(responseJson);
      })
      .catch(function (err) {
        console.error(err);
      })
  }, [props.departure, props.arrival, props.date]);
  let content;
  if (props.date) {
    content = itineraries ?
      itineraries.map(itinerary => {
        let { flight1, flight2, itineraryId } = itinerary;
        let isAvailable = !isNaN(flight1[`status${props.cabin}`]) && (!flight2 || !isNaN(flight2[`status${props.cabin}`]));
        let userId = props.userId;
        let cabin = props.cabin;
        function addToTracking() {
          return (async () => {
            if(!props.token){
              props.pushNotification({
                header: 'Track',
                body: `Log in to add the flight to your list.`
              });
              return;
            }
            try {
              let response = await fetch(`${environment.baseUrl}/tracking`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${props.token}`
                },
                body: JSON.stringify({ userId, itineraryId, cabin })
              })
              if (!response.ok) {
                throw new Error((await response.json()).message)
              }
              props.pushNotification({
                header: 'Track',
                body: 'Add to tracking list successfully.'
              })
            }
            catch (e) {
              props.pushNotification({
                header: 'Track',
                body: `Fail to add to tracking list. ${e.message}`
              })
            }
          })();
        }

        return (
          <Collapse in={!(props.nonstopOnly && flight2) && !(props.availableOnly && !isAvailable)} key={itinerary.itineraryId} >
            <div>
              <SearchResultItem itinerary={itinerary} cabin={props.cabin} isAvailable={isAvailable}
                button={<AsyncButton onClick={addToTracking}>Track</AsyncButton>} />
            </div>
          </Collapse>)
      }) :
      <div className="loading"><CenterSpinner /></div>
  }
  return (
    <section className="result_area">
      <div className="container">
        <div className="row">
          <div className="col">
            {content}
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = ({ nonstopOnly, availableOnly, token, userId }) => ({ nonstopOnly, availableOnly, token, userId })
export default connect(mapStateToProps, { pushNotification })(SearchResult)