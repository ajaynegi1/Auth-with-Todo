import React, { useContext } from 'react'
import { authContext } from '../main'
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'


const Profile = () => {

const {loading,isauthenticated,user} = useContext(authContext)

if(!isauthenticated) {
  toast("login first")
  return <Navigate to={"/login"}/> }
 
  return (
    
      
        <div className='flex mt-5 space-y-4  flex-col items-center'>
      <h1 className=' font-bold  '>{user?.name}</h1>
      <p className=' font-semibold'>{user?.email}</p>
       
    </div>

  )
}

export default Profile