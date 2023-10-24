import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({setLoggedIn}) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleInput = (e)  => {
    const {name, value} = e.target
    setFormData({
        ...formData,
        [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://mycommerce-6j7g.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('user', JSON.stringify(data))
        setLoggedIn(true)
        navigate('/')
    })
    .catch(error => {
        console.log(`Error: ${error}`);
    });
}

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className='floating-form my-2'>
                <label className='label'>Email</label>
                <input name='email' className='form-control' required placeholder='Enter Email' value={formData.email} onChange={handleInput} id='name' />
            </div>
            <div className='floating-form my-2'>
                <label className='label'>Password</label>
                <input name='password' className='form-control' required placeholder='Enter Password' value={formData.password} onChange={handleInput} id='name' />
            </div>
            <button className='btn btn-block my-3' type='submit'>Submit</button>
        </form>
      </div>
      <div className='container'>
      <div className='d-flex align-items-center  justify-content-center'>
      <p className='fs-1'>Don't have an account? <a href="/Register" className=' text-primary'> Sign up</a></p>
      </div>
      </div>
    </>
  )
}

export default Login