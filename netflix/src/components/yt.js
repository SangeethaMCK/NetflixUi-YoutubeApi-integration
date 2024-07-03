import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';


const Yt = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=UU1VDpWpOf36CuP9fowyDZtQ&key=AIzaSyC5hucyjipJJmjhoTrXJW6D3p2jvq9Jjbg')
    .then(response => response.json())
      .then(data => {
        const videoItems = data.items.map(item => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
        }));
        setVideos(videoItems);
      })
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    videos
    // <div className="App">
    //   <div className="container">
    //     <h2>Latest Videos</h2>
    //     <div id="latestVideos">
    //       {videos.map((video, index) => (
    //         <div key={index}>
    //           <h3>{video.title}</h3>
    //           <YouTube videoId={video.id} opts={{ width: '100%', height: '390' }} />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Yt;
