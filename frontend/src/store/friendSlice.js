import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {BACKEND_URL} from "../BACKEND_URL.js";

export const getConnections = createAsyncThunk(
   'connections/getConnections',
   async (_, {rejectWithValue})=>{
      try{
         const response=await axios.get(`${BACKEND_URL}/api/connection/friend-list`,{withCredentials:true}  );
         return response?.data
      }catch (e) {
         console.log(rejectWithValue(e.response.data))
      }
   }
)

export const connectionsSlice=createSlice({
   name: 'connections',
   initialState:{
      connections:[],
      loading:false

   },
   reducers:{

   },
   extraReducers:(builder)=>{
      builder.addCase(getConnections.pending,(state)=>{
         state.loading=true
      })
      builder.addCase(getConnections.fulfilled,(state,action)=>{
         state.connections=action.payload
         state.loading=false
      })
      builder.addCase(getConnections.rejected,(state)=>{
         state.loading=false
      })
   }
})

export const {} = connectionsSlice.actions;
export default connectionsSlice.reducer;

