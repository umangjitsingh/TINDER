import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit'
import {BACKEND_URL} from '../BACKEND_URL.js';
import axios from 'axios';


export const getMe = createAsyncThunk(
   "user/getMe",
   async (_, { rejectWithValue }) => {
      try {
         const result = await axios.get(`${BACKEND_URL}/api/user/me`,{withCredentials:true});
         return result.data.user; // <-- return the user
      } catch (e) {
         return rejectWithValue(e.response?.data?.message || e.message);
      }
   }
);


const userSlice = createSlice({
   name         : "user",
   initialState : {
      user   : null,
      loading: false,
      error  : null,
      isAuthenticated: false
   },
   reducers     : {},
   extraReducers: (builder) => {
      builder.addCase(getMe.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(getMe.fulfilled, (state, action) => {
         state.loading = false;
         state.user = action.payload;
         state.isAuthenticated = true;
      });
      builder.addCase(getMe.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message;
         state.isAuthenticated = false;
      });

   }
})
export const {} = userSlice.actions;
export default userSlice.reducer;