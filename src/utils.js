import mileageRequirement from './mileageRequirement.json'
import airports from './airports.json';

export const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function getLocalDateString(date) {
  const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
  const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)
  return `${year}-${month}-${day}`;
}

export function getMileageRequirement(flight1, flight2, cabin) {
  let airport1 = airports[flight1.departureAirport];
  let airport2 = airports[flight1.arrivalAirport];
  let airport3 = flight2 && airports[flight2.arrivalAirport];
  let distance = getDistance(airport1.lat, airport1.lon, airport2.lat, airport2.lon);
  if(airport3) distance += getDistance(airport2.lat, airport2.lon, airport3.lat, airport3.lon);
  let isCxKaOnly = (flight1.airline === 'CX' || flight1.airline === 'KA') && (!flight2 || flight2.airline === 'CX' || flight2.airline === 'KA');
  let mileageChart = mileageRequirement[isCxKaOnly? 'cx' : 'oneWorld'];
  let interval;
  for(let i of mileageChart.intervals){
    if(i.from <= distance && distance <= i.to){
      interval = i.interval;
      break;
    }
  }
  if(!interval) throw new Error(`Invalid itinerary. ${flight1.airline} ${flight2?.airline} ${distance} miles`);
  if(interval === 'long1/long2'){
    let isFromOrToAmerica = airport1.tz.split('/')[0] === 'America' ||
      (airport3? airport3.tz.split('/')[0] === 'America' : airport2.tz.split('/')[0] === 'America');
    interval = isFromOrToAmerica? 'long2' : 'long1';
  }
  return mileageChart[interval][cabin];
}

function getDistance(lat1, lon1, lat2, lon2) {
  var PI = Math.PI / 180
  var a = 0.5 - Math.cos((lat2 - lat1) * PI) / 2 +
    Math.cos(lat1 * PI) * Math.cos(lat2 * PI) * (1 - Math.cos((lon2 - lon1) * PI)) / 2;
  return 2 * 3958.8 * Math.asin(Math.sqrt(a));
}

export function onLinkSelect(){
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, 0)
}