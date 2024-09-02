// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const ManagerInventoryTable = ({ users,deleteUser}) => {
//   // const [users, setUsers] = useState([]);

//  console.log(users);

  

//   return (
//     <div>
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="py-2">Role</th>
//             <th className="py-2">Name</th>
//             <th className="py-2">Username</th>
//             <th className="py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td className="py-2 border-t">{user.Role}</td>
//               <td className="py-2 border-t">{user.Name}</td>
//               <td className="py-2 border-t">{user.Username}</td>
//               <td className="py-2 border-t">
//                 <Link
//                   to={`/update-user/${user._id}`}
//                   className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                 >
//                   Update
//                 </Link>
//                 <button
//                   onClick={() => deleteUser(user._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManagerInventoryTable;
import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";

const ManagerInventoryTable = ({ users, deleteUser }) => {
  const [sellers, setSellers] = useState(users);

  useEffect(() => {
    setSellers(users);
  }, [users]);

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId); // Assuming deleteUser is an async function
    setSellers(sellers.filter((user) => user._id !== userId));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Role</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Name</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Username</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-t border-gray-300">{user.Role}</td>
              <td className="py-2 px-4 border-t border-gray-300">{user.Name}</td>
              <td className="py-2 px-4 border-t border-gray-300">{user.Username}</td>
              <td className="py-2 px-4 border-t border-gray-300">
                <Link
                  to={`/update-user/${user._id}`}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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

export default ManagerInventoryTable;


