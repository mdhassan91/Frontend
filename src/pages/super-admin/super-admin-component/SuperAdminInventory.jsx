import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SuperAdminInventory = ({ users,deleteUser}) => {
  // const [users, setUsers] = useState([]);

 console.log(users);

  

  return (
    <div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2">Role</th>
            <th className="py-2">Name</th>
            <th className="py-2">Username</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 border-t">{user.Role}</td>
              <td className="py-2 border-t">{user.Name}</td>
              <td className="py-2 border-t">{user.Username}</td>
              <td className="py-2 border-t">
                <Link
                  to={`/update-manager/${user._id}`}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Update
                </Link>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminInventory;
