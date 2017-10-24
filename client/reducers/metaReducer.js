const metaReducer = (state={}, action) => {
  switch(action.type){
    case "FILL_VENUES_FULFILLED" : {
      state = action.payload.data.meta;
      break;
    }
    case "ADD_FULFILLED" : {
      const index = state.findIndex(item => {
        return (item.name === action.payload.data.name)
      });
      var edit;
      if(index === -1){
       edit = Object.assign({}, {count : 1, name: action.payload.data.name})
      }else{
        edit = Object.assign({}, state[index], {count : state[index].count + 1})
      }
      
      state = [
        ...state.slice(0, index),
         edit,
         ...state.slice(index + 1)
      ]
      break;
    }
    case "REMOVE_FULFILLED" : {
      const index = state.findIndex(item => {
        return (item.name === action.payload.data.name)
      });
      
      var edit = Object.assign({}, state[index], {count : state[index].count - 1})

      state = [
        ...state.slice(0, index),
         edit,
         ...state.slice(index + 1)
      ]
      break;
    }
  }
  return state
}

export default metaReducer;