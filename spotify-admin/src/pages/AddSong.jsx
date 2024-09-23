import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { url } from "../App";




const AddSong = () => {

  const[image,setImage]=useState(false);
  const[song,setSong]=useState(false);
  const[name,setName]=useState("");
  const[category,setCategory]=useState("")
  const[desc,setDesc]=useState("");
  const[album,setAlbum]=useState("none");
  const[loading,setLoading]=useState(false);
  const[albumData,setAlbumData]=useState([]);

  const onSumbitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true)

    try {
      const formData= new FormData();

      formData.append('name',name);
      formData.append('desc',desc);
      formData.append('image',image);
      formData.append('category',category);
      formData.append('audio',song);
      formData.append('album',album);

      const response=await axios.post(`${url}/api/song/add`,formData);

      if(response.data.success){
        toast.success("Song Added");
        setName("");
        setDesc("");
        setCategory("")
        setAlbum("none");
        setImage(false);
        setSong(false);
      }
      else{
        toast.error("Something went wrong");

      }

    } catch (error) {
      toast.error("Error");
    }
setLoading(false);
  }

  const loadAlbum=async()=>{
    try {
      const response=await axios.get(`${url}/api/album/list`);

      if(response.data.success){
        setAlbumData(response.data.album)
      }
      else{

        toast.error("Unable to load albums data")
      }
      
    } catch (error) {
      toast.error("Error")
    }
  }
useEffect(()=>{
  loadAlbum();
},[])
  return loading?
  <div className="grid place-items-center min-h-[80vh]">
    <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 animate-spin rounded-full ">

    </div>

  </div>:
  (
    <form onSubmit={onSumbitHandler} className="flex flex-col items-start gap-6 text-gray-600">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
     <input  onChange={(e)=>setSong(e.target.files[0])} type="file" id="song" accept="audio" hidden />
          <label htmlFor="song">
            <img
              className="w-24 cursor-pointer"
              src={song?assets.upload_added: assets.upload_song}
              alt=""
            />
          </label>
          </div>
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input onChange={(e)=>setImage(e.target.files[0])} accept="image/*" type="file"  id="image" hidden />
            <label htmlFor="image">
              <img
                className="w-24 cursor-pointer"
                src={image?URL.createObjectURL(image): assets.upload_area}
                alt="error"
              />
            </label>
          </div>
         </div>

        <div className="flex flex-col gap-1">
          <p>Song name</p>
          <input 
            className=" rounded bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
            placeholder="Type Here..."
            type="text"
           onChange={(e)=>setName(e.target.value)}
            value={name} required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Song description</p>
          <input 
            className=" rounded bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
            placeholder="Type Here..."
            type="text"
            
            
            onChange={(e)=>setDesc(e.target.value)} value={desc}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Category</p>
          <input 
            className=" rounded bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
            placeholder="Song/Podcast"
            type="text"
            
            onChange={(e)=>setCategory(e.target.value)} value={category}
            required
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <p>Album</p>
          <select onChange={(e)=>setAlbum(e.target.value)} defaultValue={album} className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px] cursor-pointer rounded">
          
          <option value="none">None</option>
          {albumData.map((item,index)=>(<option value={item.name}>{item.name}</option>)
          )}
          </select>

        </div>
        <button type="submit" className=" mb-2 text-base bg-green-900 text-white py-2.5 px-14 cursor-pointer rounded-lg">ADD</button>
      
    </form>
  );
};

export default AddSong;
