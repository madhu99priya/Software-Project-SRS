import React, { useEffect, useState } from "react";
import { Card, Progress } from "antd";
import axios from "axios";
import Lottie from "react-lottie";
import animationWelcome from "../../assets/Animation_Welcome_3.json";
import animationCalendar from "../../assets/Animation_Calendar.json";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [totalBookedHours, setTotalBookedHours] = useState(0);
  const [allowableHours, setAllowableHours] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [bookedDates, setBookedDates] = useState([]);

  const membershipAllowableHours = {
    "BRONZE SHUTTLE": 24,
    "SILVER SHUTTLE": 72,
    "GOLD SHUTTLE": 360,
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (storedUserId) {
      axios
        .get(`http://localhost:3000/api/users/userId/${storedUserId}`)
        .then((response) => {
          const user = response.data;
          setMembershipType(user.membershipType);
          setTotalBookedHours(user.totalBookedHours);

          const allowedHours = membershipAllowableHours[user.membershipType];
          setAllowableHours(allowedHours);

          const remaining = allowedHours - user.totalBookedHours;
          setRemainingHours(remaining > 0 ? remaining : 0);

          const percent = (remaining / allowedHours) * 100;
          setPercentage(percent.toFixed(2)); // To limit to 2 decimal points
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });

      axios
        .get(`http://localhost:3000/api/bookings/user/${storedUserId}/bookings`)
        .then((response) => {
          const dates = response.data.map((booking) => new Date(booking.date));
          setBookedDates(dates);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the booking dates!",
            error
          );
        });
    }
  }, []);

  const defaultOptionsWelcome = {
    loop: true,
    autoplay: true,
    animationData: animationWelcome, // Animation data from the JSON file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsCalendar = {
    loop: true,
    autoplay: true,
    animationData: animationCalendar, // Animation data for the calendar
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const tileClassName = ({ date, view }) => {
    const today = new Date();
    if (view === "month") {
      // Highlight upcoming booked dates
      if (
        bookedDates.find(
          (d) => d.toDateString() === date.toDateString() && date >= today
        )
      ) {
        return "highlight";
      }
      // Ash color for previous days
      if (date < today) {
        return "react-calendar__tile--previous";
      }
    }
    return null;
  };

  return (
    <div className="dashboard-container">

      <div>
        <Card className="welcome-card">
          <Lottie options={defaultOptionsWelcome} height={45} width={120} />
          <h2>Welcome, {userName}!</h2>
          <p>We are glad to see you back.</p>
        </Card>
        <Card className="package-card">
          <h2>Your Package</h2>
          <p>{membershipType}!</p>
          <p>Allowable Total Hours: {allowableHours} hours</p>
        </Card>
        <Card className="hours-card">
          <h2>Total Booked Hours</h2>
          <p>{totalBookedHours} hours</p>
        </Card>
        <Card className="remaining-hours-card">
          <h2>Remaining Hours</h2>
          <Progress
            type="circle"
            percent={percentage}
            format={() => (
              <>
                {`${remainingHours}/${allowableHours}`}
                <br />
                hrs
              </>
            )}
            width={120}
            strokeColor={{
              "0%": "red", // Start color (e.g., red)
              "100%": "blue", // End color (e.g., green)
            }}
          />
        </Card>
      </div>
      <div>
        <Card className="calendar-card">
          <h2>Your Bookings</h2>
          <div className="calendar-lottie-container">
            <Calendar tileClassName={tileClassName} />
            <Lottie options={defaultOptionsCalendar} height={250} width={250} />
          </div>
        </Card>
      </div>

   {/* <Card className="welcome-card">
        <h2>Welcome, {userName}!</h2>
        <p>We are glad to see you back.</p>
      </Card>
      <Card className="package-card">
        <h2>Your Package</h2>
        <p>{membershipType}!</p>
        <p>Allowable Total Hours: {allowableHours} hours</p>
      </Card>
      <Card className="hours-card">
        <h2>Total Booked Hours</h2>
        <p>{totalBookedHours} hours</p>
      </Card>
      <Card className="remaining-hours-card">
        <h2>Remaining Hours</h2>
        <Progress
          type="circle"
          percent={percentage}
          format={() => (
            <>
              {`${remainingHours}/${allowableHours}`}
              <br />
              hrs
            </>
          )}
          width={120}
          strokeColor={{
            "0%": "red", // Start color (e.g., red)
            "100%": "blue", // End color (e.g., green)
          }}
        />
      </Card>*/ }
     

    </div>
  );
};

export default Dashboard;
