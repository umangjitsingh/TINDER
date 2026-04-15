import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {BACKEND_URL} from '../BACKEND_URL.js';
import {getMe} from '../store/userSlice.js'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import { selectCurrentPersonality } from '../store/themeSlice'


function Login() {
   const [option, setOption] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [error, setError] = useState("");
   const [showPassword, setShowPassword] = useState(false);

   // Get current personality from Redux store
   const currentPersonality = useSelector(selectCurrentPersonality);

   async function handleLogin(e) {
      e.preventDefault();
      try {
         const result = await axios.post(`${BACKEND_URL}/api/user/login`,
            {option, password},
            {withCredentials: true});

         if (result.status === 200) {
            dispatch(getMe());
            navigate('/dashboard')
         }

      } catch (error) {
         setError(error?.response?.data?.message || error.message)
      }
   }

   return (
      <div className="w-full min-h-screen flex justify-center items-center relative overflow-hidden">
         {/* Subtle background decoration */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
         </div>

         {/* Floating emojis */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <span className="absolute top-[15%] left-[15%] text-2xl opacity-10 animate-bounce" style={{ animationDelay: '0s' }}>💕</span>
            <span className="absolute top-[25%] right-[20%] text-2xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>💬</span>
            <span className="absolute bottom-[20%] left-[20%] text-2xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>🔥</span>
            <span className="absolute bottom-[30%] right-[15%] text-2xl opacity-10 animate-bounce" style={{ animationDelay: '0.5s' }}>✨</span>
         </div>

         <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl w-96 relative z-10 border border-base-300">
            <div className="card-body">
               {/* Theme-aware emoji */}
               <div className="text-center mb-2">
                  <span className="text-4xl">{currentPersonality?.emoji || '🔥'}</span>
               </div>

               <h2 className="card-title mx-auto text-2xl">Welcome Back</h2>
               <p className="text-center text-base-content/50 text-sm mb-4">
                  We missed you! Sign in to continue
               </p>

               {/* form elements */}
               <form className="fieldset bg-base-200/30 border-base-300 rounded-box border p-4">
                  <label className="label text-sm">📧 Email or Username</label>
                  <input type="text"
                         className="input input-sm bg-base-100 focus:ring-1 outline-none focus:outline-none focus:ring-primary/50"
                         placeholder="your@email.com"
                         autoComplete="off"
                         value={option}
                         onChange={(e) => setOption(e.target.value)}
                  />


                  <div className="relative">
                     <label className="label text-sm mt-2">🔒 Password</label>
                     <input type={showPassword ? "text" : "password"}
                            className="input input-sm bg-base-100 focus:ring-1 focus:ring-primary/50 relative outline-none focus:outline-none"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                     />
                     <span onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaRegEyeSlash className="absolute text-primary/60 h-4 w-4 top-[60%] right-2" /> : <FaRegEye className="absolute text-primary/60 h-4 w-4 top-[60%] right-2"/>}
                     </span>
                  </div>

                  <button 
                     className="btn btn-primary mt-4 gap-2" 
                     onClick={(e) => handleLogin(e)}
                  >
                     <span>Sign In</span>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                     </svg>
                  </button>
               </form>

               <div className="text-center text-sm mt-4">
                  <span className="text-base-content/60">Don't have an account?</span>
                  <Link to="/register" className="text-primary hover:underline ml-1 font-medium">Join us 🚀</Link>
               </div>

               {error && (
                  <div className="alert alert-error alert-sm mt-4">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     <span className="text-xs">{error}</span>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default Login
