import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async ({ column, order }) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.get(`/api/users`, {
          headers: {
            authorization: token,
          },
        });
        if (order === "asc") {
          return data.sort((a, b) => a[column] > b[column] ? 1 : -1);
        } else if (order === "desc") {
          return data.sort((a, b) => b[column] > a[column] ? 1 : -1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const adminViewAllUsers = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = (state) => {
  return state.allUsers;
};

export default adminViewAllUsers.reducer;
