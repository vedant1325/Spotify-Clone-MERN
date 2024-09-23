import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import {  assets } from "../assets/assets";
import { PlayerContext } from "../Context/PlayerContext";

const DisplayAlbum = ({album}) => {
  const { id } = useParams();
  const{playWithId,songsData,albumsData,formatTime}=useContext(PlayerContext);
  const[albumData,setAlbumData]=useState("");

  useEffect(()=>{
    albumsData.map((item)=>{

      if(item._id===id){
       setAlbumData(item);
      }
    })
  },[])

  return  (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end ">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:trxt-7xl">
            {albumData.name}
          </h2>
          <h4 className="">{albumData.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5 mr-2"
              src={assets.spotify_logo}
              alt=""
            />
            <b>Spotify</b>
            <div className="flex justify-start items-center space-x-2 m-5">
              <img className="w-5 cursor-pointer" src={assets.thumb} alt="Thumbnail" />
              <span>1,323,341 ,</span>
              <b>&bull;&nbsp;{songsData.filter(song => song.album === albumData.name).length} songs,</b> 
              <span>&bull;&nbsp;about 2hrs 30min</span>
            </div>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden
         sm:block ">Date Added</p>
         <img className="m-auto w-4 " src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {
        songsData.filter((item)=>item.album===album.name).map((item,index)=>{
         return <div onClick={()=>{playWithId(item._id)}}  key={index} className="grid grid-cols-3 sm:grid-cols-4  gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"> 
          <p  className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index+1}</b>
            <img className="inline mr-5 w-10" src={item.image} alt="" />
            {item.name}
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>

          </div>

        })
      }
    </>
  )
};

export default DisplayAlbum;
