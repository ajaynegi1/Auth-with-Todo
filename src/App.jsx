import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import axios from 'axios'
import { server ,authContext } from './main'
import { useContext } from 'react'

function App() {
 const {setisauthenticated,setuser,setloading} = useContext(authContext)
  useEffect(
    ()=>{
      setloading(true)
      axios.get(`${server}/users/my`,{
        withCredentials:true
      }).then(res=>{
        setisauthenticated(true)
        setuser(res.data.user)
        setloading(false)
      }).catch((error)=>{
        setisauthenticated(false)
        setuser({})
        setloading(false)
      })

    },[]
  )
 
  

  return (
    <>

<Router>
<Navbar/>
<Routes>

<Route  path="/" element={<Home/>}/>
<Route path='/profile' element={<Profile/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>

</Routes>
<Toaster/>
</Router>
     
    </>
  )
}

export default App
