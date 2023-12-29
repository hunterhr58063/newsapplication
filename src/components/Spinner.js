import React from 'react'
import loding from "./VAyR.gif"

const Spinner=()=>{
 
    return (
      <div className='text-center'>
        <img  className='my-3' src={loding} alt="loding" style={{height:"50px"}} />
        
      </div>
    )
  
}

export default Spinner
