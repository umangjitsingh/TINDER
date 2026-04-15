import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BACKEND_URL} from "../BACKEND_URL.js";


export const fetchFeed = createAsyncThunk("core/feed/", async (_, {rejectWithValue}) => {
   try {
      const result = await axios.get(`${BACKEND_URL}/api/connection/core`,{withCredentials:true});
      console.log(result.data.remainingUsers);
      return result?.data?.remainingUsers;
   } catch (e) {
      return rejectWithValue(e.response?.data?.message || e.message);
   }
});

export const feedSlice = createSlice({
   name         : "feed",
   initialState : {
      feed   : null,
      loading: false,
   },
   reducers     : {},
   extraReducers: (builder) => {
      builder.addCase(fetchFeed.pending, (state) => {
         state.loading = true;
      });

      builder.addCase(fetchFeed.fulfilled, (state, action) => {
         state.feed = action.payload;
         state.loading = false;
      });
      builder.addCase(fetchFeed.rejected, (state) => {
         state.loading = false;
      });
   }
});


export const {} = feedSlice.actions;
export default feedSlice.reducer;