import React from 'react';

const VenueHolder = (props) => {
  
  const data = props.data;
  const user = props.user;
  
  const match = user.commitments.find(item => {
    return (item.commitment === data.id)
  })
  
  return(
    <div className='venue-card'>
      <div className='venue-going'>
        <h5>{props.count + " Going Tonight"}</h5>
      </div>
      <div className='venue-holder'>
        <div className='venue-image'>
          <a href={data.url}>
            <img
              src={data.image_url}
            />
          </a>
        </div>
        <div className='venue-info'>
          <a href='https://www.yelp.com'>
            <img
              className='yelp-logo'
              src={'./assets/Yelp_trademark_RGB_outline.png'}
            />
          </a>
          <br />
          <img src={'./assets/yelp_ratings/' + data.rating + '.png'}/>
          <p> {'Based on ' + data.review_count + ' Reviews'} </p>
          <h4>{data.price}</h4>
        </div>
      </div>
      <div>
        <h4>{data.name}</h4>gut 
        <h5>{data.location.address1}</h5>
        {props.user.isSignedIn ?
          <div>
            {Boolean(match) ?
              <button
                onClick={() => props.removeCommitment(match)}
              >
                Remove Commitment
              </button>
              :
              <button
                onClick={() => props.addCommitment({commitment : data.id})}
              >
                Say Your Going
              </button>
            }
          </div>
          :
          <a 
            href={
              '/auth/facebook/login/'
              + props.user.location + '/' 
              + data.id
            }>
            <button>
              Sign In And Say Your Going Tonight
            </button>
          </a>
        }
      </div>
    </div>
  )
}

export default VenueHolder;