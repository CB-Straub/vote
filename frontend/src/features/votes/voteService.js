import axios from 'axios'

const API_URL = '/api/votes/'

//create a new vote

const createVote = async (voteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, voteData, config)

    return response.data

}

//get all of a users votes
const getVotes = async ( token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data.votes

}

//delete a user vote
const deleteVote = async (voteId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + voteId, config)
    
    
    return response.data
}



const voteService = {
    createVote,
    getVotes,
    deleteVote

}

export default voteService