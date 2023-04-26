// use to grab token from local Storage
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrentUser = createAsyncThunk(
  'admin/fetchCurrentUser',
  async ({ id }) => {
    const token = window.localStorage.getItem('token');
    try {
      if (token) {
        const { data } = await axios.get(`/api/users/${id}`, {
          headers: {
            authorization: token,
          },
        });
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const selectCurrentUser = (state) => {
  return state.auth;
};

// QUERYS TO FULL CART
export const fetchCurrentCart = createAsyncThunk(
  'currentCart/fetch',
  async (id) => {
    const token = window.localStorage.getItem('token');
    try {
      if (token) {
        const { data } = await axios.get(`/api/users/${id}/cart`, {
          headers: {
            authorization: token,
          },
        });
        // console.log('fetch cart activated data is ', data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//QUERYS TO CART ITEM
// export const addCartItem = createAsyncThunk(
//   `currentCart/addItem`,
//   async (id) => {
//     const token = window.localStorage.getItem('token');
//     try {
//       if (token) {
//         console.log('add cart activated id is ', id);
//         const { data } = await axios.post(`api/cartItems`, {
//           headers: {
//             authorization: token,
//           },
//         });
//         console.log("add cart data is ", data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const addCartItem = createAsyncThunk(
  "currentCartItem/add",
  async ({
    id,
  }) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        console.log("token", token)
        console.log("product id in here is", id)
        const { data } = await axios.post("/api/cartItems", {
          productId: id,
          quantity: 1
        },
        {
          headers: {
            authorization: token,
          },
        });
        return data;
      } else {
        console.log("You are not authorized to add products.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'currentCart/item/delete',
  async ({ id, userId }) => {
    try {
      // console.log('the id in deleteCartItem', id);
      const { data } = await axios.delete(`/api/cartItems/${id}`);
      if (data) {
        return userId;
        // fetchCurrentCart(userId);
        // return data;
      } else {
        console.log('unable to delete product');
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'currentCart/item/update',
  async ({ id, newQuantity }) => {
    try {
      const { data } = await axios.put(`api/cartItems/${id}`, {
        quantity: String(newQuantity),
      });
      if (data) {
        // console.log('update cart data', data);
        return data;
      }
    } catch (error) {
      next(error);
    }
  }
);

export const selectCurrentCart = (state) => {
  // console.log("selectCurrenCart", state.currentCart)
  return state.currentCart;
};

const initialState = {
  cart: [],
};

export const currentCartSlice = createSlice({
  name: 'currentCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentCart.fulfilled, (state, action) => {
        // console.log("fetchcart action payload", action.payload)
        return action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        // console.log('action is ', action);
        // console.log('state is ', state);
        fetchCurrentCart(action.payload);
      });
  },
});

export default currentCartSlice.reducer;
