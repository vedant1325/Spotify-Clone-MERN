import { createContext, useEffect, useRef, useState } from "react";
//import { songsData } from "../assets/assets";
import axios from 'axios'

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

  const url='http://localhost:4000';
 const[songsData,setSongData]=useState([]);
 const[albumsData,setAlbumData]=useState([]);


  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, SetTrack] = useState(songsData[1]);
  const [playStatus, SetPlayStatus] = useState(false);
  const [time, Settime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    TotalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play=()=>{
   audioRef.current.play();
   SetPlayStatus(true)
  }

  const pause=()=>{
    audioRef.current.pause();
    SetPlayStatus(false)
  }

  const getSongData=async()=>{
    try {
      const response=await axios.get(`${url}/api/song/list`);
      setSongData(response.data.songs);
      SetTrack(response.data.songs[1]);
    }
     catch (error) {
      
    }
  }

  const getAlbumData=async()=>{
    const response=await axios.get(`${url}/api/album/list`);
    setAlbumData(response.data.album)
  }

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        if (seekBar.current) {
          seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
        }
        Settime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          TotalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  const playWithId=async(id)=>{
    await songsData.map((item)=>{
      if(id===item._id){
        SetTrack(item);
        SetPlayStatus(true);
      }
    })
await audioRef.current.play()
  }

  const previous=async()=>{
    songsData.map(async(item,index)=>{
      if(track._id===item._id && index>0){
        await SetTrack(songsData[index-1]);
        await audioRef.current.play();
       SetPlayStatus(true);
      }
    })
    
  }
  const next=async()=>{
    songsData.map(async(item,index)=>{
      if(track._id===item._id && index<songsData.length){
        await SetTrack(songsData[index+1]);
        await audioRef.current.play();
       SetPlayStatus(true);
      }
    })
  }

  const seekSong=async(e)=>{
    audioRef.current.currentTime=((e.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioRef.current.duration)
  }

  

  useEffect(()=>{
    getSongData();
    getAlbumData();
  },[]);



  
  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    time,
    SetTrack,
    Settime,
    playStatus,
    SetPlayStatus,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
    

  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;
