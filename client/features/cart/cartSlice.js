//    const token = window.localStorage.getItem("token");
// use to grab token from local Storage
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrentCart = createAsyncThunk(
  'currentCart/fetch',
  async (id) => {
    try {
      const { data } = await axios.get(`api/users/${id}/cart`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const currentCartSlice = createSlice({
  name: 'currentCart',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentCart.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});


export default currentCartSlice.reducer;
