import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const TOKEN = 'token';

/*
  THUNKS
*/

export const me = createAsyncThunk('auth/me', async () => {
  // ^ the name of the thunk is 'auth/me' and the async func takes no params.
  const token = window.localStorage.getItem(TOKEN);
  // 'getItem' retrieves the TOKEN object (which is created and set in the authenticate thunk) from the local storage and saves it in the variable 'token'.
  try {
    if (token) {
      const res = await axios.get('/auth/me', {
        headers: {
          authorization: token,
        },
      });
      // if the token exists in localStorage, we will make an axios get request to the route /auth/me that includes the token as an authorization header. by sending the token in the 'authorization' header, we are telling the server [1] who is making the request (token) and [2] whether the person making the request is authorized to perform the requested action (authorization header). when the server receives the request with the token in the authorzation header, it checks if the token and authorization are valid. if valid, the server performs the requested action and sends a response; if not, it denies the request and sends an error.
      // TLDR: the authorization header is a way to include a secret code (ie access token) in your requests to a server so that the server can verify your identity and permissions before allowig yout to acccess or modify its resources.
      // ANALOGY: you want to get in a locked room (ie the server) but to do so you need (1) the key (ie the access token) and (2) the secret word that allows you to use the key (ie the authorization header). there is someone who knows the key and is willing to help you. that person gives you the key and asks you to tell the doorkeeper the secret word that will allow you to use the key and enter the room.
      return res.data;
      // returns the data of the user
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return 'There was an issue with your request.';
    }
  }
});

// the below thunk takes the username, password, and method entered into the body of the AuthForm component and...
  // if LOGGING IN:
    // the server checks if the unername/password exists, if yes it checks if stores the token in local storage and dispatches the 'me' thunk to get the user's data
  // if SIGNING UP:
    // the server posts a new user and retrieves the new user's data (which there isn't any to start)
export const authenticate = createAsyncThunk(
      // ^ this is the name of the thunk.
  'auth/authenticate',
  async ({ username, password, firstName, lastName, method }, thunkAPI) => {
    // ^ this is an asynchronus function that will run when the thunk is dispatched. 'thunkAPI' is an object that gives access to the dispatch function and the 'getState' function.
    try {
      let res;
      if (method === 'signup') {
        res = await axios.post(`/auth/${method}`, { username, password, firstName, lastName });
      } else {
        res = await axios.post(`/auth/${method}`, { username, password });
      }
      window.localStorage.setItem(TOKEN, res.data.token);
      // ^ first we try to POST the username and password from req.body to the route '/auth/${method}'. 'method' will either be 'login' or 'signup' depending if the user is logging into an existing account or creating a new account. if the POST is successful, the resulting response data will be saved in the 'res' variable. 
      // with the res data returned by the axios POST request, we use dot notation to access the token property on the data property of the response ('res.data.token'). 'TOKEN' is a string ('token', defined globally) that will be passed along with 'res.data.token' into the method 'setItem'. 'setItem' creates a key value pair (TOKEN: res.data.token) and, because it is called on 'window.localStorage', this key/value pair will be stored in the browser's local storage.
      // 'localStorage' is a Web API that allows devs to store key-value pairs in the browser that persist even after the user closes the browser window or navigates away from the site. this means the data stored in localStorage can be access and used on subsequent visits to the site (i.e. items in carts should persist, and users should stay logged in to their account until they log out)
      thunkAPI.dispatch(me());
      // if there are no errors up to this point, then we will call the 'me' thunk (declared above), which retrieves the user data
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return 'There was an issue with your request.';
      }
    }
  }
);

/*
  SLICE
*/
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    me: {},
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

/*
  ACTIONS
*/
export const { logout } = authSlice.actions;

/*
  REDUCER
*/
export default authSlice.reducer;
