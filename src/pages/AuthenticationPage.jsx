import React from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import { useNavigate } from 'react-router-dom'

const AuthenticationPage = ({ onLogin, onSignup, user }) => {
  const navigate = useNavigate()
  if (user && user._id) return window.location.replace(`/${user.Role}-home`);
  //return navigate(`/${user.Role}-home`)
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-row space-x-4">
        <LoginPage onLogin={onLogin} />
        <SignupPage onSignup={onSignup} />
      </div>
    </div>
  )
}

export default AuthenticationPage