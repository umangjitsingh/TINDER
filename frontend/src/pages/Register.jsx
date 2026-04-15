import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {BACKEND_URL} from '../BACKEND_URL.js'


function Register() {

   const [firstName, setFirstname] = useState("");
   const [lastName, setLastname] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("")

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
      <div className="w-full h-screen flex justify-center items-center">
         <div className="card card-dash bg-base-100 p-1 w-96">
            <div className="card-body ">
               <h2 className="card-title mx-auto text-3xl leading-3">Are
                  You Ready </h2>
               <p className="text-center text-gray-200/40 mb-4">Sign
                  up here</p>
               {/* form elements*/}
               <form className="fieldset bg-base-200/20 border-base-300 rounded-box w-xs border p-4">

                  <label className="label">Firstname</label>
                  <input type="text"
                         className="input outline-none focus:outline-none focus:ring-1 focus:ring-primary"
                         placeholder="Firstname"
                         value={firstName}
                         onChange={(e) => setFirstname(e.target.value)}
                  />

                  <label className="label">Lastname</label>
                  <input type="text"
                         className="input outline-none focus:outline-none focus:ring-1 focus:ring-primary"
                         placeholder="Lastname"
                         value={lastName}
                         onChange={(e) => setLastname(e.target.value)}
                  />

                  <label className="label">Email</label>
                  <input type="text"
                         className="input outline-none focus:outline-none focus:ring-1 focus:ring-primary"
                         placeholder="Email"
                         autoComplete="current-email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                  />

                  <label className="label">Password</label>
                  <input type="password"
                         className="input outline-none focus:outline-none focus:ring-1 focus:ring-primary"
                         autoComplete="current-password"
                         placeholder="Password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                  />

                  <button className="btn btn-neutral   mt-4" onClick={(e) => handleRegister(e)}>SignUp</button>
               </form>
               <div className="text-center text-xs">Have an
                  account? <Link to="/login" className="text-primary">Login</Link>
               </div>
            </div>
            {error &&
               <p className="text-error text-xs text-center">{error}</p>}
         </div>
      </div>

   )
}

export default Register;


