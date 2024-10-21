import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Column } from "@ant-design/charts";
import axios from "axios";

const CourtBookingGraph = () => {
  const [data, setData] = useState([]);

  // Predefined time slots (8:00-9:00 to 20:00-21:00)
  const timeSlots = [
    "8:00-9:00",
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
    "19:00-20:00",
    "20:00-21:00",
  ];

  // Fetch booking count for Court 1
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/bookings/court/count-by-timeslot/Court%201`
      )
      .then((response) => {
        const bookingData = response.data;

        // Map time slots and assign count (set to 0 if not in bookingData)
        const formattedData = timeSlots.map((slot) => {
          const found = bookingData.find((booking) => booking._id === slot);
          return { timeSlot: slot, count: found ? found.count : 0 };
        });

        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching booking count:", error);
      });
  }, []);

  // Ant Design Column chart configuration
  const config = {
    data,
    xField: "timeSlot",
    yField: "count",
    label: {
      position: "middle", // Position of the label
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    columnStyle: {
      radius: [20, 20, 0, 0], // Rounded corners for bars
    },
    color: "#8884d8", // Custom color for the bars
    meta: {
      timeSlot: { alias: "Time Slot" },
      count: { alias: "Booking Count" },
    },
  };

  return (
    <Card>
      <Column {...config} />
    </Card>
  );
};

export default CourtBookingGraph;
