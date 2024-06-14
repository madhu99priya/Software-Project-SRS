import React from "react";
import './Join.css';
import join_us from '../../assets/join_now.png';

const Join = () =>{
    return (
        <div className="Join">
            <div className="Image-j">
                <img src={join_us} alt="" className="image"/>
            </div>
            <div className="text">
                <h1>GRAB <span className="text_w">YOUR <br></br>MEMBERSHIP </span>TODAY</h1>
                <br></br>
                <p>We craft the perfect court for you! <br></br> Be hurry! Join Us!</p>
                <br></br>
                <button className="btn">LEST JOIN NOW</button>
            </div>
        </div>
    )
}

export default Join;