import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset  } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'



const Login = () => {
   
    const  [formData , setFormData] = useState({
       
        email: '',
        password: '',
        
    })
    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isError, isLoading, isSuccess, message} = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user ) {
            toast("Login Successful")
            navigate ('/')
        }

        dispatch(reset())
    }, [user, isError, isLoading, isSuccess, message, dispatch, navigate])

    const onChange = (e) => {
        setFormData((prevState ) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email, password      
        }
        dispatch(login(userData))
    }

    if (isLoading){
        return <Spinner />
    }

  return (
    <>
    <section className='heading'>
        <h1 className='fa-user-icon'>
            <FaSignInAlt /> Login
        </h1>
        <p>Email and Password Please</p>

    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
            
             <div className="form-group">
            <input  
                type='email' 
                className='form-control' 
                id='email' name ='email' 
                value={email} 
                placeholder='Login Email'
                onChange={onChange}/>
             </div>
             <div className="form-group">
            <input  
                type='password' 
                className='form-control' 
                id='password' name ='password' 
                value={password} 
                placeholder='Password'
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

export default Login