import React from 'react'

//icons
import {  MdDelete } from "react-icons/md";

//Redeux
import { useDispatch } from 'react-redux';
import { deleteVote } from '../features/votes/voteSlice'



const VoteItem = ({ vote }) => {

    const dispatch = useDispatch()

  return (
    <div className='goal' >
        
        <h4>{vote.text}</h4>
        <button 
            className='close' 
            title="Trash Me"  
            onClick={() => dispatch(deleteVote(vote._id))}>
             <MdDelete/>
        </button>
        <div className='date' key="date">
            { Date(vote.createdAt).toLocaleString('en-us')}
        </div>
    </div>
        
  )
}

export default VoteItem