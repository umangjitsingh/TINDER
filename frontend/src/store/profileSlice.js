import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {BACKEND_URL} from "../BACKEND_URL.js";


export const editProfile = createAsyncThunk("myProfile/editProfile", async (postData, {rejectWithValue}) => {

   try {
      const response = await axios.patch(`${BACKEND_URL}/api/edit/profile`, postData, {
         withCredentials: true,
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      });
      return response.data;
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
   }
})

export const profileSlice = createSlice({
   name         : 'profile',
   initialState : {
      myProfile: null,
      loading  : false,
   },
   reducers     : {},
   extraReducers: (builder) => {
      builder.addCase(editProfile.pending, (state) => {
         state.loading = true;
      });
         builder.addCase(editProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload;
         })
   }
})

export const selectMyProfile = (state) => state.profile.myProfile;
export const selectLoading = (state) => state.profile.loading;

export const {} = profileSlice.actions;
export default profileSlice.reducer