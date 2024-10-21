import React, { useEffect, useState, useRef } from "react";
import { Card } from "antd";
import axios from "axios";
import { Pie } from "@antv/g2plot";

const Members = () => {
  const [bronzeCount, setBronzeCount] = useState(0);
  const [silverCount, setSilverCount] = useState(0);
  const [goldCount, setGoldCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const pieChartRef = useRef(null);
  const piePlotRef = useRef(null); // Reference to store the Pie chart instance

  const fetchMembershipCount = async (membershipType, setCount) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/membership/${membershipType}/total`
      );
      setCount(response.data.totalMemberships);
    } catch (error) {
      console.error("Error fetching members count:", error);
    }
  };

  useEffect(() => {
    fetchMembershipCount("BRONZE SHUTTLE", setBronzeCount);
    fetchMembershipCount("SILVER SHUTTLE", setSilverCount);
    fetchMembershipCount("GOLD SHUTTLE", setGoldCount);
  }, []);

  // Update total member count when individual counts change
  useEffect(() => {
    setMemberCount(bronzeCount + silverCount + goldCount);
  }, [bronzeCount, silverCount, goldCount]);

  const membershipData = [
    { type: "Bronze Shuttle", value: bronzeCount },
    { type: "Silver Shuttle", value: silverCount },
    { type: "Gold Shuttle", value: goldCount },
  ];

  useEffect(() => {
    if (pieChartRef.current && !piePlotRef.current) {
      piePlotRef.current = new Pie(pieChartRef.current, {
        appendPadding: 10,
        data: membershipData,
        angleField: "value",
        colorField: "type",
        color: ["red", "purple", "blue"],
        radius: 0.7,
        label: {
          type: "inner",
          offset: "-50%",
          content: "{percentage}",
          style: {
            textAlign: "center",
            fontSize: 14,
            fill: "#fff",
          },
        },
        interactions: [{ type: "element-active" }],
        legend: {
          offsetX: -20,
        },
      });
      piePlotRef.current.render();
    }

    return () => {
      if (piePlotRef.current) {
        piePlotRef.current.destroy();
        piePlotRef.current = null;
      }
    };
  }, [membershipData]);

  return (
    <div style={{ padding: "20px" }}>
      <Card title="Total" bordered={false}>
        <p>{memberCount}</p>
      </Card>
      <Card title="Membership Breakdown" bordered={true} className="pie-chart">
        <div ref={pieChartRef} className="pie-chart-container" />
      </Card>
    </div>
  );
};

export default Members;
