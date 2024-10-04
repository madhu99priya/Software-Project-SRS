import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Background from '../../assets/Background2.jpg';
import styled from 'styled-components';
import DeleteMemberPopup from './DeleteMemberPopup.jsx';
// import BreadcrumbNav from '../../Components/BreadcrumbNav/BreadcrumbNav.jsx';


const Members = () => {

  const [members, setMembers] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // setLoading(true);

    axios
      .get('http://localhost:3000/api/users')
      .then((res) => {
        setMembers(res.data.data);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
      });
  }, []);

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMember) {
      axios
        .delete(`http://localhost:3000/users/userId/${userId}`)
        .then(() => {
          setMembers(members.filter((member) => member._id !== selectedMember._id));
          setShowPopup(false);
        })
        .catch((err) => {
          alert('An error occurred. Please check the console');
          console.log(err);
          setShowPopup(false);
        });
    }
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setSelectedMember(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMembers = members.filter(
    (user) =>
     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    < div className='bg-cover bg-center h-screen' style={{ backgroundImage: `url(${Background})` }} >
      <Section>
          <div className="table-container">
            <section className="table_header">
              <div className='flex justify-between items-center p-0'>
                <h1>Members List</h1>
                <div className="flex items-center gap-2">
                  <SearchBar>
                    <input
                      type="text"
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </SearchBar>
                  <Link to='/admindashboard/members/create'>
                    <MdOutlineAddBox className='text-red-800 text-4xl' />
                  </Link>
                </div>
              </div>
            </section>
            <section className="table_body">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, index) => (
                    <tr key={member._id} className='h-8'>
                      <td>{index + 1}</td>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.age}</td>
                      <td>
                        <div className='flex justify-start gap-x-4'>
                          <Link to={`/admindashboard/members/show/${member._id}`}>
                            <BsInfoCircle className='text-2xl text-green-900' />
                          </Link>
                          <Link to={`/admindashboard/members/edit/${member._id}`}>
                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                          </Link>
                          <button onClick={() => handleDeleteClick(member)} className='text-red-600'>
                            <MdOutlineDelete className='text-2xl' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </Section>
    </div>
  
  );
};

export default Members;


const Section = styled.section`
  color: black;

  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60vw;
    max-height: 85vh;
    background-color: rgba(255, 255, 255, 0.7); /* More transparent */
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    overflow: hidden;
    margin: 4rem auto;
    padding: 1rem;
  }

  .table_header {
    width: 100%;
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .table_header h1 {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 0;
  }

  .table_body {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .table_body table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  table,
  th,
  td {
    padding: 1rem;
    border: 1px solid #ddd;
  }

  thead th {
    position: sticky;
    top: 0;
    background-color: #f8f9fa;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tbody tr:nth-child(even) {
    background-color: rgba(250, 250, 250, 0.5);
  }

  tbody tr:hover {
    background-color: #e9ecef;
  }

  tbody td {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .table_body::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background-color: #0004;
  }
`;

const SearchBar = styled.div`
  input {
    padding: 0.4rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    outline: none;
    width: 200px;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.6); /* Transparent background */
    margin-left: 1rem;
  }

  input::placeholder {
    color: gray;
  }
`;
