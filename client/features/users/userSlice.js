import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUser = createAsyncThunk(
  "singleUser/fetch",
  async (id) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.get(`/api/users/${id}`, {
          headers: {
            authorization: token,
          },
        });
        return data;
      } else {
        console.log("Access denied.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchOrderHistory = createAsyncThunk(
  "orderHistory/fetch",
  async (id) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await axios.get(`/api/users/${id}/orderHistory`, {
          headers: {
            authorization: token,
          },
        });
        return data;
      } else {
        console.log("Access denied.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/edit",
  async ({ id, firstName, lastName }) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        console.log(
          `id: ${id}, firstName: ${firstName}, lastName: ${lastName}`
        );
        const { data } = await axios.put(
          `/api/users/${id}`,
          {
            firstName,
            lastName,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        return data;
      } else {
        console.log("You are not authorized to edit this user.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const singleUserSlice = createSlice({
  name: "singleUser",
  initialState: {
    user: {},
    orderHistory: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.orderHistory = action.payload;
      });
    // .addCase(editUser.fulfilled, (state, action) => {
    // return action.payload;
    // })
  },
});

export const selectSingleUser = (state) => {
  return state.singleUser;
};

export default singleUserSlice.reducer;
