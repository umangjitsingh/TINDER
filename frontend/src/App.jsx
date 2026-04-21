
import './App.css'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import {Provider} from 'react-redux';
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import appStore from './store/appStore.js'
import PendingRequests from "./pages/PendingRequests.jsx";
import Connections from "./pages/Connections.jsx";





function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/dashboard",
          element:<Dashboard/>
        },
        {
          path:"/profile",
          element:<Profile/>
        },
        {
          path:"/pending-request",
          element:<PendingRequests/>
        },
        {
          path:"/connections",
          element:<Connections/>
        },

      ]
    }
  ])

  return (
     <Provider store={appStore}>
       <RouterProvider router={router}/>
     </Provider>

  )
}

export default App
