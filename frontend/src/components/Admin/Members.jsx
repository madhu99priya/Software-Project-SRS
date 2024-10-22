import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

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
    width: 80vw;
    max-height: 85vh;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 2rem;
    overflow-y: auto;
  }

  .table_header {
    width: 100%;
    padding-bottom: 1rem;
    text-align: center;
    border-bottom: 2px solid #ccc;
  }

  .table_header h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
  }

  .table_header h1 .members {
    color: black;
  }

  .table_header h1 .list {
    color: #ff5733;
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
    background-color: rgba(248, 249, 250, 0.8);
  }

  tbody tr:hover {
    background-color: #e9ecef;
    cursor: pointer;
  }

  tbody td {
    border-bottom: 1px solid #ddd;
  }

  /* Style for a specific column, like Membership Type */
  tbody td:nth-child(8) {
    background-color: #dff0d8;
    color: #3c763d;
    text-align: center;
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
    background-color: #adb5bd;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .table-container {
      width: 95vw;
    }

    .table_header h1 {
      font-size: 1.5rem;
    }

    .table_body table {
      font-size: 0.9rem;
    }
  }
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f1f3f5;
  color: #495057;
  outline: none;

  &:focus {
    border-color: #adb5bd;
    background-color: #e9ecef;
  }

  &::placeholder {
    color: #868e96;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
