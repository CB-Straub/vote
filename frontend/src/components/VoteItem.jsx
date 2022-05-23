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
        {/* <div>
            {new Date(vote.createdAt).toLocaleString('en-us')}
        </div> */}
        <h4>{vote.text}</h4>
        <button 
            className='close' 
            title="Delete"  
            onClick={() => dispatch(deleteVote(vote._id))}>
                <MdDelete/>
        </button>
    </div>
        
  )
}

export default VoteItem