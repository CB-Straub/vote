import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

//loading spinner
import Spinner from '../components/Spinner'

//useSelector = select the state to manage, ie user, isLoading;  useDispatch = brings in a function  to dispatch that action ie from the reducer 
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { register, reset} from '../features/auth/authSlice'


const Register = () => {
   
    const  [formData , setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { name, email, password, confirmPassword } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth ) 


    useEffect(() => {
        //if theres an error it will notify with toast
        if(isError) {
            toast.error(message)
        }
        //if the user is registered it will navigate to the dashboard page for the user
        if(isSuccess || user ) {
           navigate('/')
           toast('Thanks for registering!')
        }

        dispatch(reset())

    }, [user, isError, isLoading, isSuccess, message, navigate, dispatch])



    const onChange = (e) => {
        setFormData((prevState ) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            toast.error('Passwords do not match!')
        }else {
            const userData = {
                name, 
                email, 
                password,
            }

            dispatch(register(userData))  //dispatches the register function passing into it the user data
        }
    }


    //spinner component
    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
    <section className='heading'>
        <h1 className='fa-user-icon'>
            <FaUser /> Sign Up
        </h1>
        <p className='signup'>Let's get you signed up!</p>

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