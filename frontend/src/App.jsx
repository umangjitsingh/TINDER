
import './App.css'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import {Provider} from 'react-redux';
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import appStore from './store/appStore.js'



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
        }
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
