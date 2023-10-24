import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

function Register() {
    const [formData, setFormData] = useState({
        name: '',   
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleInput = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
          toast('Successfull')
          navigate('/login')
        })
        .catch(error => {
          console.log(error)
        });
    }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className='floating-form my-2'>
                <label className='label'>Name</label>
                <input name='name' className='form-control' required placeholder='Enter Name' value={formData.name} onChange={handleInput} id='name' />
            </div>
            <div className='floating-form my-2'>
                <label className='label'>Email</label>
                <input name='email' className='form-control' required placeholder='Enter Email' value={formData.email} onChange={handleInput} id='email' />
            </div>
            <div className='floating-form my-2'>
                <label className='label'>Password</label>
                <input name='password' className='form-control' required placeholder='Enter Password' value={formData.password} onChange={handleInput} id='password' />
            </div>
            <button className='btn btn-block' type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Register