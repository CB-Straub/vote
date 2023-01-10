import React, { useState } from 'react'
import  { useDispatch } from 'react-redux'
import { createVote } from '../features/votes/voteSlice'




const VoteForm = () => {
    const dispatch = useDispatch()

const [ text, setText] = useState('') 
const onSubmit =(e) => {
    e.preventDefault()

    dispatch(createVote({ text }))
    setText('')
}

  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor='text'></label>
                
                <input 
                    type='text' 
                    name='text' 
                    id='text' 
                    placeholder='Add new blog post here'
                    value={ text }
                    onChange={ (e) => setText(e.target.value)}
                />
            </div>
            <div className="form-group">
                <button className='btn btn-block' type='submit'>Tell us a story</button>
            </div>
        </form>
    </section>
  )
}

export default VoteForm