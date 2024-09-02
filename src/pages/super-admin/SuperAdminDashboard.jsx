import React from 'react';
import { useNavigate } from 'react-router-dom';

import SuperAdminInventory from './super-admin-component/SuperAdminInventory';

const SuperAdminDashboard = ({  users, deleteUser }) => {
  const navigate = useNavigate();

  const handleUpdateInfoClick = () => {
    navigate('/update-info');
  };

  const handleAddUserClick = () => {
    navigate('/add-user');
  };

  return (
    <div className="p-4">
     <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Super Admin Management</h2>
        <SuperAdminInventory users={users} deleteUser={deleteUser} />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
