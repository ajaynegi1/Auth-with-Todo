import React, { useState } from "react";
import { Link } from "react-router-dom";
import { server } from "../main";
import axios from 'axios';
import toast from "react-hot-toast";
import { authContext } from "../main";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {

  const [email,setemail]=useState("")
  const [password,setpassword] = useState("")
  const {isauthenticated,setisauthenticated,loading,setloading}  =useContext(authContext)

  const  submithandler = async (e)=>{
e.preventDefault()

try {
  setloading(true)
  const {data} = await axios.post(`${server}/users/login`,{
    email,password
   },{
    headers:{"Content-Type":"application/json"},
    withCredentials:true
  
   })
   toast.success(data.message)
   setisauthenticated(true)
   setloading(false)
   
  } catch (error) {
    
    toast.error(error.response.data.message )
    console.log(error)
    setisauthenticated(false)
    setloading(false)
    
}

  }

  if(isauthenticated) return <Navigate to={'/'}/>


  return (
    <>
      <div
        className="flex min-h-full flex-1  px-6 py-12 lg:px-8 mt-7 flex-col flex-wrap 
justify-center bg-gray-100 p-8 rounded shadow-md max-w-md 
w-full mx-auto items-center border-2"
      >
        <h2 className="  text-center mb-8 font-extrabold text-gray-600">
          LOGIN
        </h2>
        <form
          
          onSubmit={submithandler}
          className="flex flex-col flex-wrap justify-center bg-gray-50 p-8 rounded-full  shadow-2xl max-w-md 
w-full mx-auto items-center border-2 overflow-hidden"
        >
          <div className=" flex m-2 space-x-8  ">
            <label htmlFor="em">email</label>
            <input type="email" placeholder="email" id="em" 
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
            required
             />
          </div>
          <div className=" flex m-2 space-x-8 ">
            <label htmlFor="pw">password</label>
            <input type="password" placeholder="password" id="pw" 
               value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
            required
            />
          </div>
          <button disabled={loading} className=" border-2 px-3 mt-6 rounded-md bg-blue-400 hover:bg-blue-500">
            LOGIN
          </button>
        </form>

        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200 mt-6">
          OR
        </p>

        <div className="  text-center mt-4 hover:text-blue-400 font-bold ">
          <Link to={"/register"}>SIGN IN</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
