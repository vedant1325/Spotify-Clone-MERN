import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error fetching songs");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const removeSong = async (id,name) => {
    const userConfirmed = window.confirm(`Are you sure you want to remove the song "${name}?"`);
    
    if (userConfirmed) {
      try {
        const response = await axios.post(`${url}/api/song/remove`, { id });
        if (response.data.success) {
          toast.success("Song Removed");
          await fetchSongs();  // Refresh the list after successful removal
        } else {
          toast.error("Error removing song");
        }
      } catch (error) {
        toast.error("Error removing song");
      }
    }
  };

  

  return (
    <div>
      <p>All Songs & Podcast list</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.6fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Category</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => (
          <div key={index} className="grid drid-cols-[1fr_1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
            <img className="w-12" src={item.image} alt="" />
            <p><b>{item.name}</b></p>
            <p>{item.album}</p>
            <p>{item.category}</p>
            <p>{item.duration}</p>
            <button onClick={()=>{removeSong(item._id,item.name)}} className=" bg-red-600 text-white rounded p-1 hover:bg-red-700 sm:p-1 md:p-1.5 md:mt-1"><b>Delete</b></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSong;
