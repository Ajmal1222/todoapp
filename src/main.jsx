import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Home from './components/Home/Home.jsx'

const router = createBrowserRouter([
  {
      path: '/',
      element: <App></App>,
      children: [
        {
          path: '/',
          element: <Home></Home>

        },
        {
          path: "/login",
          element: (
            
              <Login></Login>
            
          ),
        },
        {
          path: "/signup",
          element: <SignUp></SignUp>
  
        },

      ] 
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
