import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext , server } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'


const Navbar = () => {

  const {isauthenticated,setisauthenticated,loading,setloading}  = useContext(authContext)


  const  logouthandler = async (e)=>{
   
    
    try {
      setloading(true)
    
      const {data} = await axios.get(`${server}/users/logout`,{
        
        withCredentials:true
      
       })
       toast.success(data.message)
       setisauthenticated(false)
       setloading(false)
      
    } catch (error) {
    
      toast.error(error.response.data.message )
      console.log(error)
      setisauthenticated(true)
      setloading(false)
      
    }
    
      }


  return (
   <>


  <div className='bg-slate-500  w-full text-white flex py-4 px-3 justify-between '>

  <div className='border-2 rounded-lg  text-black border-black'>
<h1 className='mx-3'>TODO APP</h1>
  </div>

<nav className='justify-end mx-5'>

<ul className='flex space-x-7 text-lg'>
    <li className=' hover:navhover '>
        <Link to={"/"} >Home</Link>
    </li>
    <li className='hover:navhover'>
<Link to={"/profile"}>Profile</Link>
    </li>
    
    {

      isauthenticated?<li className='hover:navhover'>
      <button disabled={loading} onClick={logouthandler}>Logout</button>
    </li>:<li className='hover:navhover'>
<Link to={"/login"}>Login</Link>
    </li>

    }

</ul>

</nav>

  </div>

   </>
  )
}

export default Navbar