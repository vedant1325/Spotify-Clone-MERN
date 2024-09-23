import React, { useContext, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";

import Music from "./Music";
import Podcast from "./Podcast";
import { PlayerContext } from "../Context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  const bgColors = isAlbum && albumsData.length>0 ? albumsData.find((x) => (x._id == albumId)).bgColor: "#121212";

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColors},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  });
  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-2.5 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75]% lg:ml-0"
    >
      {albumsData.length>0?
      
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id"  element={<DisplayAlbum album={albumsData.find((x) => x._id ==albumId)} />}
        />
        <Route path="/music" element={<Music />} />
        <Route path="/podcast" element={<Podcast />} />
      </Routes>:null
    }
    </div>
  );
};

export default Display;
