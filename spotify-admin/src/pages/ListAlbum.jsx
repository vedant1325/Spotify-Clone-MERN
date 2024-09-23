import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {

  const[data,setData]=useState([]);

  const fetchAlbums=async()=>{
    try {

      const response=await axios.get(`${url}/api/album/list`);

      if(response.data.success){
        setData(response.data.album)
      }
      
    } catch (error) {
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchAlbums();
  },[]);

  const removeAlbum=async(id,name)=>{
    const userConfirmed = window.confirm(`Are you sure you want to remove the album "${name}?"`);
    if(userConfirmed){

      try {
        const response=await axios.post(`${url}/api/album/remove`,{id});
        if (response.data.success) {
          toast.success("Album Removed");
          await fetchAlbums();  // Refresh the list after successful removal
        } else {
          toast.error("Error");
        }
  
        
      } catch (error) {
        toast.error("Error");
      }
    }
    }

  return( 
  <div>
    <p>All Albums List</p>
    <br />
    <div>
     <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
      <b>Image</b>
      <b>Name</b>
      <b className='hidden md:block'>Description</b>
      <b>Album Colour </b>
      <b>Action</b>

     </div>
     {data.map((item,index)=>{
      return(
        <div key={index} className='grid drid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
          <img className='w-12' src={item.image} alt="error" />
          <p><b>{item.name}</b></p>
          <p className='hidden md:block'>{item.desc}</p><input type="color"  value={item.bgColor} name="" id="" />
          <button onClick={()=>{removeAlbum(item._id,item.name)}} className=" bg-red-600 text-white rounded p-1 hover:bg-red-700 sm:p-1 md:p-1.5 "><b>Delete</b></button>
          

        </div>
      )
     })}
    </div>
  </div>
  )
  
}

export default ListAlbum
