import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

const Register = () => {
   
    const  [formData , setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { name, email, password, confirmPassword } = formData

    const onChange = (e) => {
        setFormData((prevState ) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
    <section className='heading'>
        <h1 className='fa-user-icon'>
            <FaUser /> Sign Up
        </h1>
        <p>Let's get you signed up!</p>

    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <input  
                type='text' 
                className='form-control' 
                id='name' name ='name' 
                value={name} 
                placeholder='Please enter your name'
                onChange={onChange}/>
             </div>
             <div className="form-group">
            <input  
                type='email' 
                className='form-control' 
                id='email' name ='email' 
                value={email} 
                placeholder='Please enter your email'
                onChange={onChange}/>
             </div>
             <div className="form-group">
            <input  
                type='password' 
                className='form-control' 
                id='password' name ='password' 
                value={password} 
                placeholder='Create an unhackable password'
                onChange={onChange}/>
             </div>
             <div className="form-group">
            <input  
                type='password' 
                className='form-control' 
                id='confirmPassword' name ='confirmPassword' 
                value={confirmPassword} 
                placeholder='Confirm your password'
                onChange={onChange}/>
             </div>
             <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
                        
             </div>
        </form>
    </section>
        
    
    </>
  )
}

export default Register