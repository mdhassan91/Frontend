  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';

  const UpdateInfo = ({ user, updateUser }) => {
    const navigate = useNavigate();
    const [name, setName] = useState(user.Name);
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState('');

    const handleUpdateInfo = () => {
      updateUser({ name, username, password });
      alert('User info updated successfully!');
      navigate('/profile');
    };

    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Update Info</h1>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          onClick={handleUpdateInfo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    );
  };

  export default UpdateInfo;
