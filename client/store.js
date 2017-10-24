import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import user from "./reducers/userReducer";
import venues from "./reducers/venuesReducer";
import meta from "./reducers/metaReducer";

export default createStore(
  combineReducers({
    user : user,
    venues : venues,
    meta : meta,
  }), {
    venues : [],
    user : {
      isSignedIn : false,
      location : null,
      commitments : []
    },
    meta : []
  },
  applyMiddleware(logger, thunk, promise())
);

