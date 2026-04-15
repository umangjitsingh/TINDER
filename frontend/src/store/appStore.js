import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import themeSlice from './themeSlice';
import feedSlice from './feedSlice';


const appStore=configureStore({
   reducer:{
      user: userSlice,
      theme: themeSlice,
      feed: feedSlice,

   }
})

export default appStore;