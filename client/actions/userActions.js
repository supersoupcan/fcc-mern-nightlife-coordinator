import axios from 'axios';

export function checkUser(){
  return dispatch => {
    axios.get('/api/checkUser')
    .then(res => {
      dispatch({
        type : "INIT_USER",
        payload : res.data
      })
      if (res.data.location){
        dispatch({
          type : "FILL_VENUES",
          payload : axios.post('/api/yelpFusion', {location : res.data.location})
        })
      }
    })
    .catch(err => {
      if (err) throw err;
    })
  }
}

export function addCommitment(commitment){
  return {
    type : "ADD",
    payload : axios.post('api/add', {data : commitment})
  }
}

export function removeCommitment(commitment){
  return {
    type : "REMOVE",
    payload : axios.post('api/remove', {data : commitment})
  }
}