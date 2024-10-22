import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
// import Background from "../../../assets/members_background.jpeg"; // replace with your own background image

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/users"); // Replace with your actual API route
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filter members based on search term
  const filteredMembers = members.filter((member) => {
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
    );
  });

  return (
    <Section>
      <div className="table-container">
        <section className="table_header">
          <h1>
            <span className="members">Members</span>
            <span className="list"> List</span>
          </h1>
          <SearchInput
            type="text"
            placeholder="Search members by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </section>
        <section className="table_body">
          {loading ? (
            <p>Loading...</p>
          ) : filteredMembers.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Join Date</th>
                  <th>Membership Type</th>
                  <th>Total Booked Hours</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => (
                  <tr key={member.userId}>
                    <td>{index + 1}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.phone}</td>
                    <td>{member.age}</td>
                    <td>{member.address}</td>
                    <td>{new Date(member.joinDate).toLocaleDateString()}</td>
                    <td>{member.membershipType || "N/A"}</td>
                    <td>{member.totalBookedHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No members found matching your search.</p>
          )}
        </section>
      </div>
    </Section>
  );
};

export default Members;

const Section = styled.section`
  color: black;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70vw;
    max-height: 80vh;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    overflow-y: auto;
  }

  .table_header {
    width: 100%;
    padding-bottom: 1rem;
    text-align: left;
    border-bottom: 2px solid #ccc;
  }

  .table_header h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
  }

  .table_header h1 .members {
    color: black;
  }

  .table_header h1 .list {
    color: red;
  }

  .table_body {
    width: 100%;
    overflow-x: auto;
  }

  .table_body table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 1rem;
  }

  table,
  th,
  td {
    padding: 0.8rem;
    border: 1px solid #ddd;
    font-weight: bold;
  }

  thead th {
    position: sticky;
    top: 0;
    background-color: #f1f3f5;
    color: #495057;
    font-weight: bold;
    text-align: left;
    border-bottom: 2px solid #ddd;
  }

  tbody tr:nth-child(even) {
    background-color: rgba(248, 249, 250, 0.7);
  }

  tbody tr:hover {
    background-color: #e9ecef;
  }

  tbody td {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .table_body p {
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
    color: #495057;
  }

  .table_body::-webkit-scrollbar {
    width: 8px;
  }

  .table_body::-webkit-scrollbar-thumb {
    background-color: #ced4da;
    border-radius: 4px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: 1px solid #ccc; /* Light gray border */
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f1f3f5; /* Light gray background */
  color: #495057; /* Dark gray text */
  outline: none;

  &:focus {
    border-color: #adb5bd; /* Darker gray on focus */
    background-color: #e9ecef; /* Slightly darker background on focus */
  }

  &::placeholder {
    color: #868e96; /* Lighter gray for placeholder text */
  }
`;


