
import {Link, useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ColorPallet from './ColorPallet'
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {BACKEND_URL} from "../BACKEND_URL.js";
import { logout } from "../store/userSlice.js";



const Navbar = () => {
const userData=useSelector(state=>state.user);
const location = useLocation();
const navigate=useNavigate()
const dispatch = useDispatch();

   const handleLogout = async () => {
      try{
         const response = await axios.get(`${BACKEND_URL}/user/logout`, {withCredentials: true});
         if(response?.status === 200 && response?.data?.message === "Logout successful") {
            dispatch(logout());
            navigate('/login');
         }
      }catch (e) {
         console.log(e.response?.data || e.message)
      }
   }

   return (
      <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300 sticky top-0 z-50 px-4 sm:px-6">
         <div className="flex-1 flex items-center gap-3">
            <Link className="text-2xl sm:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity" to="/">
               tinder<span className="text-primary">.</span>
            </Link>
            {location.pathname !== '/' && <ColorPallet />}
         </div>

         <div className="flex items-center gap-3">
            {userData?.user?.firstName && (
               <span className="hidden sm:inline text-sm font-medium text-base-content/70 capitalize">
                  Hi, {userData.user.firstName}
               </span>
            )}

            <div className="dropdown dropdown-end">
               <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  {userData?.user?.photoUrl ? (
                     <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100">
                        <img
                           className="object-cover w-full h-full"
                           alt="User avatar"
                           src={userData?.user?.photoUrl}
                        />
                     </div>
                  ) : (
                     <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-primary-content font-bold text-sm">
                           {userData?.user?.firstName?.[0] || '?'}
                        </span>
                     </div>
                  )}
               </div>

               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow-xl border border-base-300"
               >
                  <li className="menu-title text-xs text-base-content/50 uppercase tracking-wider px-3 py-2">
                     Account
                  </li>
                  <li>
                     <Link to="/profile" className="rounded-lg hover:bg-base-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                     </Link>
                  </li>
                  <li>
                     <Link to="/dashboard" className="rounded-lg hover:bg-base-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                        Discover
                     </Link>
                  </li>
                  <li>
                     <Link to="/connections" className="rounded-lg hover:bg-base-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        Connections
                     </Link>
                  </li>
                  <div className="divider my-1" />
                  <li>
                     <button onClick={handleLogout} className="rounded-lg text-error hover:bg-error/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                     </button>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}
export default Navbar

