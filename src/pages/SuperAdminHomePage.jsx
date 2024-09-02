import React, { useEffect, useState } from 'react'
import ManagerDashboard from './manager/ManagerDashboard'
import axios from 'axios';
import SuperAdminDashboard from './super-admin/SuperAdminDashboard';

const SuperAdminHomePage = ({superAdmin}) => {
  const [users,setUsers]=useState([])
  console.log(superAdmin);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/users/${superAdmin._id}`);
        console.log(response);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [superAdmin]);

 
  const deleteUser = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:8000/user/${id}`
      );
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <div>
      <SuperAdminDashboard users={users} deleteUser={deleteUser}/>

      {/* <ManagerDashboard users={users} deleteUser={deleteUser}/> */}
    </div>


  )
}

export default SuperAdminHomePage