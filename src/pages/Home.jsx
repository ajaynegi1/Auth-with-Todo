import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../main'
import { toast } from 'react-hot-toast'
import Todolist from '../components/Todolist'
import { useContext } from 'react'
import { authContext } from '../main'
import { Navigate } from 'react-router-dom'


const Home = () => {

  const  [title,settitle] = useState("")
  const  [description,setdescription] = useState("")
  const [loading, setloading] = useState(false)
  const [tasks,settasks] =useState([])
  const {isauthenticated} = useContext(authContext)

  const updatehandler = async (id)=>{
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},{withCredentials:true})
      toast.success(data.message)

      
    } catch (error) {
      toast.error(error.response.data.message)
      
    }
    
  }
  const deletehandler = async(id)=>{
    
    try {
     const {data} = await axios.delete(`${server}/task/${id}`,{withCredentials:true})
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const submithandler = async (e)=>{
    e.preventDefault()

    try {
      setloading(true)
      const {data}=  await axios.post(`${server}/task/newtask`,
      {title,description}
      ,{
        Headers:{"Content-Type":"application/json"},
        withCredentials:true
      })
      toast.success(data.message)
      
      setloading(false)
      settitle("")
      setdescription("")
    } catch (error) {
      toast.error(error.response.data.message)
      setloading(false)
      
    }

   
  }

  useEffect(()=>{

   axios.get(`${server}/task/mytask`,
  {withCredentials:true}
  ).then((res)=>{
    settasks(res.data.mytask)})
    .catch((error)=>{
      toast.error(error.response.data.message)
    })

  })

if(!isauthenticated) {return <Navigate to={"/login"}/>}
  

  return (
    <>

<div className='max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 '>

<div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
    </div>
<section >

<form className=' fw-full max-w-sm mx-auto flex flex-col items-center border-b-2 border-gray-500 py-2 px-8 gap-6  '
onSubmit={submithandler} >

<input
className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3
 py-1 px-8 leading-tight focus:outline-none'
 type='text' placeholder='Title' 
value={title}
onChange={(e)=> settitle(e.target.value)}
required
/>

<input
className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 
py-1 px-8 leading-tight focus:outline-none'
  type='text'
  placeholder='Description'
  value={description}
  onChange={(e)=>setdescription(e.target.value)}
/>

<button disabled={loading} className='flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500
 hover:border-black-700 text-sm border-4 text-white py-1 px-2 rounded'>
 Create Task </button>
</form>



</section>

<div className=' mt-5'>

{
tasks.map((i)=>(
   <Todolist title={i.title} description={i.description} iscompleated={i.iscompleated}
    updatehandler={updatehandler} deletehandler={deletehandler} id={i._id} key={i._id}  />
))
}
</div>


</div>


    </>
    
  )
}

export default Home