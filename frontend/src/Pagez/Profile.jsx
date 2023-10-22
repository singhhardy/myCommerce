import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({userData, setLoggedIn}) {

  // console.log(userData)  

  const navigate = useNavigate()

  const signout = () => {
    localStorage.removeItem('user')
    navigate('/')
    setLoggedIn(false)
  }

  return (
    <>
      <div className='container'>
        <h1>{userData.name}</h1>
        <h3>{userData.email}</h3>
        <button className='btn' onClick={signout}>Logout</button>
      </div>
    </>
  )
}

export default Profile