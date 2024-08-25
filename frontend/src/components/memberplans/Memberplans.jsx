import React from 'react'
import './Memberplans.css'
import { plansData } from '../../../data/plansData.jsx'
import whiteTick from '../../assets/whiteTick.png'
import { Link } from 'react-router-dom'


const Plans = () => {
  return (
    
    <div className="plans-container-n">
        <div className="programs_header" style={{gap:' 2.4rem'}}>
            <span >Plans for</span>
            <span className='stroke-text'>  Badminton </span>
        </div>

        <div className="plans">
           { plansData.map((plan) => (
            <div className="plan" key={plan.id} >
                {plan.icon}
                <span>{plan.name}</span>
                <span>Rs. {plan.price}</span>

                <div className="features">
                    {plan.features.map((feature,index) =>(
                        <div className="feature" key={index} >
                            <span style={{fontSize : '10px'}}><img src={whiteTick} alt="" /></span>
                            <span >{feature}</span>
                        </div>
                    ))}
                </div>
                <Link to = '/memberaccount' className='button'>Subscribe</Link>
            </div>
           ))}

        </div>
    </div>
  )
}

export default Plans
