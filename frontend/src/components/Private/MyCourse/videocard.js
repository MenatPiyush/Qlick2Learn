
import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player";
import axios from 'axios';

function VideoCard({ course }) {

  const [videos, setVideos] = useState([]);


  useEffect(() => {
    axios.get("https://csci-5709-nodejs.herokuapp.com/api/student/getvideos/" + course).then(res => {
      setVideos(res.data.data);
    }).catch(err => console.log("Err is", err))
  })

  return (
    videos.map((item) => {
      return (
        <div>
          <ReactPlayer
            url={item.video}
          />
        </div>
      );
    }))
}
export default VideoCard;