import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import themeSlice from './themeSlice';
import feedSlice from './feedSlice';
import profileSlice from "./profileSlice.js";
import connectionsSlice from "./friendSlice.js";

const appStore=configureStore({
   reducer:{
      user: userSlice,
      theme: themeSlice,
      feed: feedSlice,
      myProfile: profileSlice,
      connections: connectionsSlice

   }
})

export default appStore;