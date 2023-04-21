import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async() => {
        try {
            const {data} = await axios.get(`/api/users`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const adminViewAllUsers = createSlice({
    name: 'allUsers',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectAllUsers = (state) => {
    return state.allUsers
}

export default adminViewAllUsers.reducer