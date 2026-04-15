import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {BACKEND_URL} from '../BACKEND_URL.js'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";


function Register() {
   const[showPassword,setShowPassword]=useState(false)
   const [firstName, setFirstname] = useState("");
   const [lastName, setLastname] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [currentTheme, setCurrentTheme] = useState('nearrock');


   // Get current theme on mount
   useEffect(() => {
      const savedTheme = localStorage.getItem('app-theme') || 'nearrock';
      setCurrentTheme(savedTheme);
   }, []);

   // Theme emojis for personality
   const themeEmojis = {
      'nearrock': '🎭',
      'midnight-purple': '🌙',
      'cyberpunk-neon': '⚡',
      'forest-dark': '🌲',
      'sunset-dark': '🌅',
      'nordic-frost': '❄️',
      'glassymax': '✨',
      'dancinglol': '🎉'
   };

   async function handleRegister(e) {
      e.preventDefault();
      try {
         const result = await axios.post(`${BACKEND_URL}/api/user/register`,
            {firstName, lastName, email, password},
            {withCredentials: true});
         setError("")
      } catch (e) {
         setError(e.response?.data?.message || e.message)
      }
   }

   return (
      <div className="w-full min-h-screen flex justify-center items-center relative overflow-hidden">
         {/* Subtle background decoration */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
         </div>

         {/* Floating emojis */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <span className="absolute top-[15%] right-[15%] text-2xl opacity-10 animate-bounce" style={{ animationDelay: '0s' }}>🌟</span>
            <span className="absolute top-[25%] left-[20%] text-2xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>💫</span>
            <span className="absolute bottom-[20%] right-[20%] text-2xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>🎯</span>
            <span className="absolute bottom-[30%] left-[15%] text-2xl opacity-10 animate-bounce" style={{ animationDelay: '0.5s' }}>🌈</span>
         </div>

         <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl w-96 relative z-10 border border-base-300">
            <div className="card-body">
               {/* Theme-aware emoji */}
               <div className="text-center mb-2">
                  <span className="text-4xl">{themeEmojis[currentTheme] || '🚀'}</span>
               </div>

               <h2 className="card-title mx-auto text-2xl">Join the Vibe</h2>
               <p className="text-center text-base-content/50 text-sm mb-4">
                  Create your account and find your people
               </p>

               {/* form elements */}
               <form className="fieldset bg-base-200/30 border-base-300 rounded-box border p-4">
                  <label className="label text-sm">👤 First Name</label>
                  <input type="text"
                         className="input input-sm bg-base-100 focus:ring-1 focus:ring-primary/50"
                         placeholder="John"
                         value={firstName}
                         onChange={(e) => setFirstname(e.target.value)}
                  />

                  <label className="label text-sm mt-2">👤 Last Name</label>
                  <input type="text"
                         className="input input-sm bg-base-100 focus:ring-1 focus:ring-primary/50"
                         placeholder="Doe"
                         value={lastName}
                         onChange={(e) => setLastname(e.target.value)}
                  />

                  <label className="label text-sm mt-2">📧 Email</label>
                  <input type="text"
                         className="input input-sm bg-base-100 focus:ring-1 focus:ring-primary/50"
                         placeholder="john@example.com"
                         autoComplete="current-email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                  />


                  <div className="relative">
                     <label className="label text-sm mt-2">🔒 Password</label>
                     <input type={showPassword ? "text" : "password"}
                            className="input input-sm bg-base-100 focus:ring-1 focus:ring-primary/50 relative"
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
                     onClick={(e) => handleRegister(e)}
                  >
                     <span>Create Account</span>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                     </svg>
                  </button>
               </form>

               <div className="text-center text-sm mt-4">
                  <span className="text-base-content/60">Already have an account?</span>
                  <Link to="/login" className="text-primary hover:underline ml-1 font-medium">Sign in 👋</Link>
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

export default Register;


