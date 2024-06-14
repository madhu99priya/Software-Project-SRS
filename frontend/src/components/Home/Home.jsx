import React from 'react'
import Branding from '../Branding/Branding.jsx'
import Reasons from '../Reasons/Reasons.jsx'
import './Home.css'
import Plans from '../Plans/Plans.jsx'
import Join from '../Join/Join.jsx'
import OnlineReservations from '../OnlineReservations/Onlinereservations.jsx'


const Home = () => {
  return (
    <div>
      <section id='Branding'>
         <Branding />
      </section>

      <section id='reasons'>
        < Reasons />
      </section>
       
      <section id='plans'>
      < Plans />
      </section> 

      <section id='join'>
        <Join />
      </section>


      <section id='onlinereservations'>

        <OnlineReservations />

      </section>

     
       
    </div >
  )
}

export default Home
