import React, { Component } from 'react'
import loding from "./VAyR.gif"

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img  className='my-3' src={loding} alt="loding" style={{height:"50px"}} />
        
      </div>
    )
  }
}

export default Spinner
