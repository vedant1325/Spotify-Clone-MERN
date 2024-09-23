import React, { useContext } from 'react'
import { PlayerContext } from '../Context/PlayerContext'

const SongItem = ({name,id,image,desc}) => {
  const{playWithId}=useContext(PlayerContext)
  return (
    <div onClick={()=>{playWithId(id)}} className='min-w-[180px] p-2 x-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded' src={image} alt="" />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-100 text-small'> {desc.slice(0,49)}...</p>
      
    </div>
  )
}

export default SongItem
