import React from 'react';

const Profile = (props) => {
  return(
    <div className='searchArea'>
      <h3>{props.user.name}</h3>
      <h4>{props.user.location}</h4>
      <a href="/auth/logout"> 
        <button style={{width: '20%'}}> Logout </button>
      </a>
    </div>
  )
}

export default Profile; 