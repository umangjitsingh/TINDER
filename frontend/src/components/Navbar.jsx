
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ColorPallet from './ColorPallet'
import {useSelector} from "react-redux";



const Navbar = () => {
const userData=useSelector(state=>state.user);
const location = useLocation();

   return (
      <div className="navbar bg-base-100 shadow-sm">
         <div className="w-1/3 flex items-center  gap-2  ">
            <Link className="text-2xl sm:text-3xl font-bold" to="/">tinder. </Link>

            {location.pathname === '/' ? null : <ColorPallet/>}

         </div>
         <div className="flex gap-2 items-center justify-end bg-zinc-700/10 w-2/3">
            {/**/}

            <div className="dropdown dropdown-end">
               <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar relative">

                  {userData?.user?.firstName && userData?.user?.lastName ? (
                     <p className="text-xs bg-base-100 absolute top-3 -right-2 -translate-x-1/2 whitespace-nowrap font-medium capitalize ">
                      Welcome,  {userData.user.firstName} {userData.user.lastName}
                     </p>): ""
                  }
                  {userData?.user?.photoUrl ? (
                     <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                        <img
                           className="object-cover object-center w-full h-full"
                           alt="User avatar"
                           src={userData?.user?.photoUrl}
                        />
                     </div>
                  ): ""}


               </div>

               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
               >
                  <li>
                     <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                     </Link>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a>Logout</a></li>
               </ul>
            </div>

         </div>
      </div>
   )
}
export default Navbar

