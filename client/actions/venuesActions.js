import axios from 'axios';

export function getVenues(location){
  return {
    type : "FILL_VENUES",
    payload : axios.post('/api/yelpFusion', {location : location})
  }
}
