import React, { useContext } from 'react'
import Navbar from './Navbar'
//import { songsData } from '../assets/assets'
import SongItem from './SongItem'
import { PlayerContext } from '../Context/PlayerContext'

const Podcast = () => {
  const{songsData}=useContext(PlayerContext);
  const musicSongs = songsData.filter(item => item.category === "Podcast");

  return (
    <>
      <Navbar />
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Hit Podcast</h1>
        <div className='grid grid-cols-2  sm:grid-cols-4  md:grid-cols-5 lg:grid-cols-6 gap-4'>
          {musicSongs.map((item, index) => (
            <SongItem 
              key={index} 
              name={item.name} 
              desc={item.desc} 
              id={item._id} 
              image={item.image} 
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Podcast
