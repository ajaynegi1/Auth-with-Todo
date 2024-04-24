import React from 'react'
import { useState } from 'react'
import { MdDelete } from "react-icons/md";

const Todolist = (props) => {


  return (
    <div>

<div className=' flex flex-row justify-between items-center mr-4 border-b-4  divide-gray-200'>

<div className='flex flex-col relative my-3 items-start ml-4 content-center py-2  px-4 '>
<h4 className='text-lg font-medium '>{props.title}</h4>
<p className='text-sm font-light text-gray-500 '>{props.description}</p>



</div>

<div>
  <input  className=' h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded mx-2'
   type="checkbox" checked={props.iscompleated}
   onChange={()=>{props.updatehandler(props.id)}}


  />
  <button onClick={()=>{props.deletehandler(props.id)}} className=' border-2 border-slate-600 rounded-2xl px-2 hover:bg-gray-200'> <MdDelete/> </button>

</div>

 
    </div>

    </div>
  )
}

export default Todolist