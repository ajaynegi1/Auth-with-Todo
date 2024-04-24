import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  { createContext, useState } from 'react'

export const server = 'https://nodejs-todoapp-backend-2zt4.onrender.com/api/v1'

export const authContext = createContext({isauthenticated:false});


const AppWrapper =()=>{

 const [isauthenticated, setisauthenticated  ] = useState(false)
 const [loading,setloading] = useState(false)
 const [user,setuser] = useState({})

  return(
    <authContext.Provider 
    value={{isauthenticated,setisauthenticated,loading,setloading, user,setuser}}
    >

      <App/>

    </authContext.Provider>

  )

}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
