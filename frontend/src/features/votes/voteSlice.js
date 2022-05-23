import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import voteService from "./voteService";

const initialState = {
    votes: [],
    isError: false,
    isLoading: false, 
    isSuccess: false,
    message: ''
}

//create a new vote
export const createVote = createAsyncThunk('votes/create', async (voteData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await voteService.createVote(voteData, token)

        }catch(error){
            const message = (error.response && error.response.data && error.message) 
            || error.message 
            || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
})
//get all of a users votes
// 
export const getVotes = createAsyncThunk( 'votes/getAll', async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await voteService.getVotes(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  // Delete a user vote 
export const deleteVote  = createAsyncThunk( 'goals/delete', async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await voteService.deleteVote(id, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )




export const voteSlice = createSlice({
    name:'vote',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
            
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(createVote.pending, ( state ) => {
            state.isLoading = true
        })
        .addCase(createVote.fulfilled, ( state, action ) => {
            state.isLoading = false
            state.isSuccess = true
            state.votes.push(action.payload)
        })
        .addCase(createVote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getVotes.pending, ( state ) => {
            state.isLoading = true
        })
        .addCase(getVotes.fulfilled, ( state, action ) => {
            state.isLoading = false
            state.isSuccess = true
            state.votes = (action.payload)
        })
        .addCase(getVotes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteVote.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteVote.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.votes = state.votes.filter(
              (vote) => vote._id !== action.payload.id
            )
          })
          .addCase(deleteVote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
        
    }
})

export const { reset } = voteSlice.actions
export default voteSlice.reducer