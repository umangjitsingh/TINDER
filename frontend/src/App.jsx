
import './App.css'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Login from './pages/Login'
import Register from './pages/Register'



function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
