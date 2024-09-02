import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance/axiosInstance'; // Import the custom Axios instance
import { useNavigate } from 'react-router-dom';


const LoginPage = ({ onLogin, user }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  // useEffect(() => {

  if (user && user._id) return window.location.replace(`/${user.Role}-home`);
  // }, []);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const credentials = { Username: username, Password: password }; // Match with backend expectations

    console.log({ username, password });

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Invalid credentials`);
      }

      const data = await response.json(); // Get the actual data object
      console.log("Data>>>", data);
      console.log("Data Token>>>", data.data.token);

      // Store token in localStorage
      localStorage.setItem('token', data.data.token);

      // Fetch user details using axios
      const userResponse = await axiosInstance.get('/user', {
        headers: {
          Authorization: `Bearer ${data.data.token}`,
        },
      });

      const userData = userResponse.data.data;
      console.log(userData);

      if (userData && userData.Role) {
        onLogin(userData.Role, userData); // Optionally set role in parent component if needed

        const role = userData.Role;
        console.log("User Role:", role);

        if (role === 'user') {
          navigate('/user-home');
        } else if (role === 'manager') {
          navigate('/manager-home');
        } else if (role === 'movie-seller') {
          navigate('/movie-seller-home');
        } else if (role === 'event-manager') {
          navigate('/event-manager-home');
        } else if (role === 'super-admin') {
          navigate('/super-admin-home');
        } else {
          navigate('/login');
        }
      }
      else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Implement password reset logic here
    try {
      const response = await axiosInstance.post('/user/forgot-password', {
        Username: username,
        newPassword,
      });

      if (response.status === 200) {
        alert('Password reset successful');
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error resetting password', error);
      alert('Failed to reset password');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Enter
              </button>
              <div className="flex justify-between items-center">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <a
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
                <button
                  type="button"
                  className="text-sm font-medium text-gray-500 hover:underline dark:text-primary-500"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 space-y-4 w-full max-w-md">
            <h2 className="text-xl font-bold">Reset Password</h2>
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 text-sm text-white bg-gray-500 rounded-md hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoginPage;

