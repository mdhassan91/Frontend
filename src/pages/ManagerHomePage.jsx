import React, { useEffect, useState } from 'react'
import ManagerDashboard from './manager/ManagerDashboard'
import axios from 'axios';

const ManagerHomePage = ({manager}) => {
  const [users,setUsers]=useState([])
  console.log(manager);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/users/${manager._id}`);
        console.log(response);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [manager]);

 
  const deleteUser = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:8000/user/manager/${id}`
      );
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <div>

      <ManagerDashboard users={users} deleteUser={deleteUser}/>
    </div>


  )
}

export default ManagerHomePage