import React from 'react'
import './Reasons.css'

const Reasons = () => {
    
    const reasons = [
        {
          id: 1,
          title: 'EXPERT COACHING TEAM',
          description: 'At our badminton sports complex, we pride ourselves on having a team of experienced and certified badminton coaches. Our coaches are passionate about the sport and dedicated to helping players of all levels improve their skills.',
        },
        {
          id: 2,
          title: 'STATE-OF-THE-ART FACILITIES',
          description: 'From specialized flooring to high-quality nets and lighting, we\'ve invested in top-notch facilities to create an environment that caters to the needs of both casual players and serious competitors.',
        },
        {
          id: 3,
          title: 'FLEXIBLE MEMBERSHIP OPTIONS',
          description: 'We enable you to experience fitness and health results that go beyond the scale and mirror with our 3D body visualization technology.',
        },
        {
          id: 4,
          title: 'SATISFACTION GUARANTEED',
          description: 'We offer flexible membership options to accommodate various preferences. Whether you\'re looking for a casual drop-in experience or a long-term membership, our range of plans caters to different playing frequencies and duration.',
        },
      ];

  return (

    <div className="reasons-container">
        <div className="header">
        <br></br>
          <br></br>
            <h1>
                WHY <span className='highlight-n'> CHOOSE US</span>
            </h1>
            <p1>To deliver world class indoor sports experience to people with safe, <br></br>high quality service and focusing on teaching kids how to move forward with <br></br>sports-specific training to empower our community.</p1>
        </div>

        <div className="cards">
        {reasons.map((reason) => (
        <div key={reason.id} className="reason-card">
          <h2>{reason.id}. {reason.title}</h2>
          <p>{reason.description}</p>
        </div>
      ))}
            

        </div>

    </div>
  )
}

export default Reasons
