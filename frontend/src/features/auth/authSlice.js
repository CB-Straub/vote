import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//fetch the user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''

}

//function for user sign up
export const register= createAsyncThunk('auth/register', async ( user, thunkAPI ) => {
    try {

        return await authService.register(user)

    }catch(error) {
        const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) //sends the error message as payload
    }
})

//login a user functionality
export const login = createAsyncThunk('auth/login', async ( user, thunkAPI ) => {
    try {

        return await authService.login(user)

    }catch(error) {
        const message = (error.response && error.response.data && error.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) //sends the error message as payload
    }
})

//logout functionality
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
}) 



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }

    },
    //used instead of switch/case action types
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload //ties into the rejectWithValue thunkAPI method above to return the error found
            state.user = null 

        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload //ties into the rejectWithValue thunkAPI method above to return the error found
            state.user = null 

        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
    }
})

export const { reset } = authSlice.actions  //allows firing of the rese=t function in the required components
export default authSlice.reducer