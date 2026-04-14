import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {BACKEND_URL} from '../BACKEND_URL.js'

function Login() {
   const[option,setOption]=useState("");
   const[password,setPassword]=useState("");

   async function handleLogin(e) {
      e.preventDefault();
      try{
         const result =await axios.post(`${BACKEND_URL}/api/user/login`,
            {option, password},
            {withCredentials: true});
         console.log(result.data);
      }catch (e) {
         console.log(e)
      }
   }
   return (
      <div className="w-full h-screen flex justify-center items-center">
         <div className="card card-dash bg-base-100 p-1 w-96">
            <div className="card-body ">
               <h2 className="card-title mx-auto text-3xl leading-3">Welcome Back </h2>
               <p className="text-center text-gray-200/40 mb-4">Sign in to your account</p>
               {/* form elements*/}
               <form className="fieldset bg-base-200/20 border-base-300 rounded-box w-xs border p-4">

                  <label className="label">Email or Username</label>
                  <input type="text"
                         className="input outline-none focus:outline-none focus:ring-1 focus:ring-primary "
                         placeholder="Email/Username"
                         autoComplete="off"
                           value={option}
                          onChange={(e) => setOption(e.target.value)}
                     />

                  <label className="label">Password</label>
                  <input type="password"
                         className="input outline-none focus:outline-none focus:ring-1 focus:ring-primary"
                         placeholder="Password"
                         autoComplete="current-password"
                           value={password}
                          onChange={(e) => setPassword(e.target.value)}
                     />

                  <button className="btn btn-neutral   mt-4" onClick={(e) => handleLogin(e)}>Login</button>
               </form>
               <div className="text-center text-xs">Don't have an account? <Link to="/register" className="text-primary">Register</Link></div>
            </div>
         </div>
      </div>

   )
}

export default Login
