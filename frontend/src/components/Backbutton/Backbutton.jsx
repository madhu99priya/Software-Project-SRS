import { Link } from 'react-router-dom'
import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import './Backbutton.css'

const Backbutton = ( {destination = '/'}) => {
  return (
    <div className='flex'>
       <Link to  = {destination} className='button-container'>
            < IoMdArrowRoundBack  size={25} color='blue' className='icon'/>
       </Link>
      
    </div>
  )
}

export default Backbutton
