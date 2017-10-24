import React, { Component } from 'react';

export default class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      query : ''
    }
  }
  
  handleChange(e){
    this.setState({
      query : e.target.value
    })
  }
  
  render(){
    return(
      <div className='searchArea'>
        <h3> What City Are You In? </h3>
        <div className='holder'>
          <div className='locationHolder'>
            <input
              type="text"
              className="locationInput"
              value={this.state.query}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className='search'>
            <i
            className="fa fa-search fa-3x" 
            onClick={() => this.props.getVenues(this.state.query)}>
            </i>
          </div>
        </div>
      </div>
    )
  }
}