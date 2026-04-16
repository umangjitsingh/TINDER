import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import themeSlice from './themeSlice';
import feedSlice from './feedSlice';
import {profileSlice} from "./profileSlice.js";

const appStore=configureStore({
   reducer:{
      user: userSlice,
      theme: themeSlice,
      feed: feedSlice,
      myProfile: profileSlice

   }
})

export default appStore;