const userReducer = (state={}, action) => {
  switch(action.type){
    case "INIT_USER" : {
      state = Object.assign({}, state, action.payload)
      break;
    }
    case "FILL_VENUES_FULFILLED" : {
      state = Object.assign({}, 
      state, {location : action.payload.data.location});
      break;
    }
    case "ADD_FULFILLED" : {
      state = Object.assign({},
        state,
        {commitments : action.payload.data.newCommitments}
      )
    }
    case "REMOVE_FULFILLED" : {
        state = Object.assign({},
        state,
        {commitments : action.payload.data.newCommitments}
      )
    }
  }
  return state
}

export default userReducer;