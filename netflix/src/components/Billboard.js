import React, { useState, useEffect } from "react";
import Contents from "./Content";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./billboard.css";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Billboard() {
  const [videos, setVideos] = useState({});
  const [hoveredVideo, setHoveredVideo] = useState(false);

  function setHovered() {
    setTimeout(() => {
      setHoveredVideo(true);
    }, 1000);
  }



  useEffect(() => {
    fetch(
      "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&channelId=UC8butISFwT-Wl7EV0hUK0BQ&playlistId=PLWKjhJtqVAbm04DK8TSUCRheRjW2P9TR7&key=AIzaSyC5hucyjipJJmjhoTrXJW6D3p2jvq9Jjbg"
    )
      .then((response) => response.json())
      .then((data) => {
        const videoItem = data.items[0];
        const videoDetails = {
          id: videoItem.snippet.resourceId.videoId,
          title: videoItem.snippet.title,
          description: videoItem.snippet.description,
          thumbnail: videoItem.snippet.thumbnails.high.url,
        };
        setVideos(videoDetails);
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="billboard">
        <div
          className="billboard-container"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, #444444 100%), url(${videos.thumbnail})`,
          }}
          onMouseOver={() => setHovered()}
          onMouseLeave={() => setHoveredVideo(false)}
        >
          {hoveredVideo && (
            <iframe
              src={`https://www.youtube.com/embed/${videos.id}?controls=0&showinfo=0&rel=0&modestbranding=1&autohide=1&autoplay=1 `}
              loading="eager"
              className="billboard-video"
            >
           </iframe>
          )}
           {hoveredVideo && <div className="billboard-video-overlay"></div>}

          <div className="billboard-content">
            <span className="title">{videos.title}</span>
            <div className="btn-container">
              <Link to={`/video/${videos.id}`}>
                <button className="play-button">
                  <FontAwesomeIcon icon={faPlay} style={{ marginRight: "5px" }} /> Play
                </button>
              </Link>
              <button className="moreInfo">
                <FontAwesomeIcon icon={faInfoCircle} /> More Info
              </button>
            </div>
          </div>
        </div>
        <Contents />
        <Outlet />
      </div>
    </>
  );
}
