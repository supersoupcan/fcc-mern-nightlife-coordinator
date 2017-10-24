const venueReducer = (state=[], action) => {
  switch(action.type){
    case "FILL_VENUES_FULFILLED" : {
      state = action.payload.data.yelp;
      break;
    }
  }
  return state
}

export default venueReducer;