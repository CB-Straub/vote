import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


//components
import VoteForm from '../components/VoteForm'
import Spinner from '../components/Spinner'
import VoteItem from '../components/VoteItem'

//redux
import { getVotes, } from '../features/votes/voteSlice'
import { reset } from '../features/auth/authSlice'


const Dashboard = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const { user } = useSelector((state) => state.auth)
const { votes, isLoading, isError, message} =useSelector((state) => state.votes)

useEffect(() => {

  if(isError) {
    console.log(message)

  }else{dispatch(reset())}

  if(user) {
    dispatch(getVotes())
    
  }else{
    navigate('/login')
  }

  // dispatch(getVotes()) //fetches the votes from the backend to provide access to the dashboard
  // return () => {
  //   dispatch(reset())
  // }

  }, [ user, navigate, isError, message, dispatch  ])

  if(isLoading){
    return <Spinner />
  }
  


  return (
    <>
    <section className='heading'>
      <h3>Hi {user && user.name}</h3>
      <p>Welcome to your dashboard</p>


    </section>

    <VoteForm/>

    <section className='content'>
    {votes.length > 0 ? (
          <div className='goals'>
            {votes.map((vote) => (
              <VoteItem key={vote._id} vote={vote} />
            ))}
          </div>
        ) : (
          <h3>No stories yet. </h3>
        )}
    </section>
    
    </>
  )
}

export default Dashboard