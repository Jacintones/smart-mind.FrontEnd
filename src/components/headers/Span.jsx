import React from 'react'
import "tailwindcss/tailwind.css";

const Span = (props) => {
  return (
    <div className='text-1xl text-white font-bold mb-7'>
      <span onClick={props.onChange}>
        {props.children}
        
      </span>
    </div>
  )
}

export default Span
