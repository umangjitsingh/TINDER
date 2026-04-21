import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BACKEND_URL} from "../BACKEND_URL.js";


export const fetchFeed = createAsyncThunk("core/feed/", async (_, {rejectWithValue}) => {
   try {
      const result = await axios.get(`${BACKEND_URL}/api/connection/core`,{withCredentials:true});
     return result?.data
   } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
   }
});

export const feedSlice = createSlice({
   name         : "feed",
   initialState : {
      feed   : null,
      loading: false,
      error  : null,
   },
   reducers     : {
      resetFeed:(state,action)=>{
         if (state.feed && Array.isArray(state.feed.remainingUsers)) {
            state.feed.remainingUsers = state.feed.remainingUsers.filter(
               (item) => item._id.toString() !== action.payload
            );
         }
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchFeed.pending, (state) => {
         state.loading = true;
         state.error = null;
      });

      builder.addCase(fetchFeed.fulfilled, (state, action) => {
         state.feed = action.payload;
         state.loading = false;
         state.error = null;
      });
      builder.addCase(fetchFeed.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload || action.error.message;
      });
   }
});


export const {resetFeed} = feedSlice.actions;
export default feedSlice.reducer;