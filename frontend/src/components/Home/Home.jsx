import React from 'react'
import Branding from '../Branding/Branding.jsx'
import Reasons from '../Reasons/Reasons.jsx'
import './Home.css'
import Plans from '../Plans/Plans.jsx'

const Home = () => {
  return (
    <div >

      <section id='Branding'>
         <Branding />
      </section>

      <section id='reasons'>
        < Reasons />
      </section>
       
      <section id='plans'>
      < Plans />
      </section> 
       
    </div >
  )
}

export default Home
