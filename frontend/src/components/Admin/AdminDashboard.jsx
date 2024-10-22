import React, { useEffect, useRef, useState } from "react";
import { Card, Spin, Progress, Row, Col, Tabs } from "antd";
import axios from "axios";
import { Pie, Column } from "@antv/g2plot";
import "./AdminDashboard.css";

const { TabPane } = Tabs;

const AdminDashboard = () => {
  const [membershipCount, setMembershipCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [membershipData, setMembershipData] = useState([]);
  const [courtBookings, setCourtBookings] = useState([]);
  const [timeSlotBookings, setTimeSlotBookings] = useState([]);
  const membershipChartRef = useRef(null);
  const timeSlotChartRef = useRef(null);

  const [courtTimeSlotBookings, setCourtTimeSlotBookings] = useState({
    "Court 1": [],
    "Court 2": [],
    "Court 3": [],
    "Court 4": [],
  });

  const court1Ref = useRef(null);
  const court2Ref = useRef(null);
  const court3Ref = useRef(null);
  const court4Ref = useRef(null);

  const chartRefs = {
    "Court 1": court1Ref,
    "Court 2": court2Ref,
    "Court 3": court3Ref,
    "Court 4": court4Ref,
  };

  const allTimeSlots = [
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          membershipCountRes,
          membershipBreakdownRes,
          courtBookingsRes,
          timeSlotBookingsRes,
        ] = await Promise.all([
          axios.get("http://localhost:3000/api/users/membership-count"),
          axios.get("http://localhost:3000/api/users/membership-breakdown"),
          axios.get("http://localhost:3000/api/bookings/court-bookings"),
          axios.get("http://localhost:3000/api/bookings/time-slot-bookings"),
          fetchCourtTimeSlotData(),
        ]);

        setMembershipCount(membershipCountRes.data.count);
        setMembershipData([
          { type: "BRONZE SHUTTLE", value: membershipBreakdownRes.data.bronze },
          { type: "SILVER SHUTTLE", value: membershipBreakdownRes.data.silver },
          { type: "GOLD SHUTTLE", value: membershipBreakdownRes.data.gold },
        ]);
        setCourtBookings(courtBookingsRes.data);
        setTimeSlotBookings(timeSlotBookingsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (membershipData.length > 0 && membershipChartRef.current) {
      const piePlot = new Pie(membershipChartRef.current, {
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
      piePlot.render();
    }
  }, [membershipData, membershipChartRef.current]);

  const fetchCourtTimeSlotData = async () => {
    const courts = ["Court 1", "Court 2", "Court 3", "Court 4"];
    const bookingsPromises = courts.map((courtName) =>
      axios.get(
        `http://localhost:3000/api/bookings/court/${encodeURIComponent(
          courtName
        )}/time-slot-bookings`
      )
    );
    const bookingsData = await Promise.all(bookingsPromises);

    const updatedCourtTimeSlotBookings = courts.reduce((acc, court, index) => {
      acc[court] = bookingsData[index].data;
      return acc;
    }, {});

    setCourtTimeSlotBookings(updatedCourtTimeSlotBookings);
  };

  const renderCourtChart = (courtName, ref) => {
    const data = courtTimeSlotBookings[courtName];

    const mergedData = allTimeSlots.map((slot) => {
      const foundSlot = data.find((booking) => booking._id === slot);
      return { _id: slot, count: foundSlot ? foundSlot.count : 0 };
    });

    if (ref && Array.isArray(mergedData) && mergedData.length > 0) {
      ref.current.innerHTML = "";
      new Column(ref.current, {
        data: mergedData,
        xField: "_id",
        yField: "count",
        label: {
          position: "middle",
          style: { fill: "#FFFFFF", opacity: 0.6 },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
            rotate: Math.PI / 6,
            offset: 10,
            offsetX: 25,
          },
        },
        meta: {
          _id: { alias: "Time Slot" },
          count: { alias: "Bookings" },
        },
        height: 300,
        columnStyle: {
          fill: "l(90) 0:#0000FF 1:#FF0000",
        },
      }).render();
    }
  };

  useEffect(() => {
    Object.keys(chartRefs).forEach((courtName) => {
      renderCourtChart(courtName, chartRefs[courtName]);
    });
  }, [courtTimeSlotBookings]);

  useEffect(() => {
    // Merge allTimeSlots with timeSlotBookings data
    const mergedData = allTimeSlots.map((slot) => {
      const foundSlot = timeSlotBookings.find(
        (booking) => booking._id === slot
      );
      return { _id: slot, count: foundSlot ? foundSlot.count : 0 };
    });

    if (mergedData.length > 0 && timeSlotChartRef.current) {
      const columnPlot = new Column(timeSlotChartRef.current, {
        data: mergedData, // Use merged data for the chart
        xField: "_id",
        yField: "count",
        label: {
          position: "middle",
          style: { fill: "#FFFFFF", opacity: 0.6 },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
            rotate: Math.PI / 6,
            offset: 10,
            offsetX: 25,
          },
        },
        meta: {
          _id: { alias: "Time Slot" },
          count: { alias: "Bookings" },
        },
        height: 300,
        columnStyle: {
          fill: "l(90) 0:#0000FF 1:#FF0000",
        },
      });
      columnPlot.render();
    }
  }, [timeSlotBookings]);

  const totalBookings = courtBookings.reduce(
    (acc, court) => acc + court.count,
    0
  );

  const sortedCourtBookings = courtBookings.sort((a, b) => {
    const courtA = parseInt(a._id.replace(/\D/g, ""), 10);
    const courtB = parseInt(b._id.replace(/\D/g, ""), 10);
    return courtA - courtB;
  });

  return (
    <div className="adminDashboard-container">
      <div className="numerical-data">
        <Card
          title="Total Subscriptions"
          bordered={true}
          className="numerical-card"
        >
          {loading ? (
            <Spin />
          ) : (
            <p
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                marginTop: "0",
                marginBottom: "0",
              }}
            >
              {membershipCount}
            </p>
          )}
        </Card>
        <Card title="Total Revenue" bordered={true} className="numerical-card">
          <p>Total revenue</p>
        </Card>
      </div>
      <div className="progress-container">
        {/* Time Slot Bookings by Court */}
        <Card>
          <Tabs
            defaultActiveKey="1"
            className="tabs-container"
            animated={{ tabPane: true }}
          >
            <TabPane tab="Overall Bookings by Time Slot" key="1">
              <Card title="Overall Bookings by Time Slot" bordered={true}>
                <Row justify="center">
                  <Col>
                    {loading ? (
                      <Spin />
                    ) : (
                      <div ref={timeSlotChartRef} className="chart-container" />
                    )}
                  </Col>
                </Row>
              </Card>
            </TabPane>

            {Object.keys(chartRefs).map((court, index) => (
              <TabPane tab={court} key={index + 2} forceRender>
                <Card title={`${court} Bookings by Time Slot`} bordered={true}>
                  <Row justify="center">
                    <Col>
                      <div ref={chartRefs[court]} className="chart-container" />
                    </Col>
                  </Row>
                </Card>
              </TabPane>
            ))}
          </Tabs>
        </Card>

        <Card
          title="Court Bookings Breakdown"
          bordered={true}
          className="adminDashboard-card"
        >
          <div className="court-bookings-container">
            <Row justify="center">
              {sortedCourtBookings.map((court) => (
                <Col span={9} key={court._id}>
                  <div className="court-progress">
                    <p>{court._id}</p>
                    <Progress
                      type="dashboard"
                      percent={((court.count / totalBookings) * 100).toFixed(2)}
                      status="active"
                      size={130}
                      strokeColor={{
                        "0%": "red",
                        "100%": "blue",
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Card>
      </div>
      <div>
        <Card
          title="Membership Breakdown"
          bordered={true}
          className="pie-chart"
        >
          <div ref={membershipChartRef} className="pie-chart-container" />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
