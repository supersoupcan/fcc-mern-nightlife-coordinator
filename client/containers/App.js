import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getVenues } from '../actions/venuesActions';
import { checkUser, addCommitment, removeCommitment } from '../actions/userActions';

import Title from '../components/Title';
import Search from '../components/Search';
import VenueHolder from '../components/VenueHolder';
import Profile from '../components/Profile';

import axios from 'axios';

class App extends Component {
  componentWillMount(){
    this.props.checkUser();
  }
  
  render(){
    const props = this.props;
    return(
      <div>
        <Title />
        {props.user.isSignedIn ?
          <Profile
            user={props.user}
          />
          :
          <Search 
            getVenues={props.getVenues}
          />
        }
        {props.venues.length > 0 &&
          <div className='venues-fb'> 
            {props.venues.map((venue, index) => {
            
              const meta = props.meta.find(item => {
                return (item.name === venue.id)
              })
              
              const count = (meta == null) ? 0 : meta.count;
              
              return(
                <VenueHolder
                  count={count}
                  key={index}
                  data={venue}
                  user={props.user}
                  addCommitment={props.addCommitment}
                  removeCommitment={props.removeCommitment}
                />
              )})}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    venues : state.venues,
    user : state.user,
    meta : state.meta
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVenues : (location) => {
      dispatch(getVenues(location));
    },
    checkUser : () => {
      dispatch(checkUser());
    },
    addCommitment : (commitment) => {
      dispatch(addCommitment(commitment))
    },
    removeCommitment : (commitment) => {
      dispatch(removeCommitment(commitment))
    }
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(App);
