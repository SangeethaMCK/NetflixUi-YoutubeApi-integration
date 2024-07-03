import React, { useState, useEffect } from "react";
import "./content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faThumbsUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Contents() {
  const [playlists, setPlaylists] = useState([]);
  const [hoveredVideo, setHoveredVideo] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistsResponse = await fetch(
          "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UC8butISFwT-Wl7EV0hUK0BQ&maxResults=6&key=AIzaSyC5hucyjipJJmjhoTrXJW6D3p2jvq9Jjbg"
        );
        const playlistsData = await playlistsResponse.json();
        const playlistItems = playlistsData.items.map((item) => ({
          id: item.id,
          title: item.snippet.title,
        }));
        setPlaylists(playlistItems);

        // Fetch videos for each playlist
        playlistItems.forEach(async (playlist) => {
          try {
            const videosResponse = await fetch(
              `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${playlist.id}&key=AIzaSyC5hucyjipJJmjhoTrXJW6D3p2jvq9Jjbg`
            );
            const videosData = await videosResponse.json();
            const videoItems = videosData.items.map((item) => ({
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.default.url,
            }));

            // Update the playlist with its videos
            setPlaylists((prevPlaylists) => {
              const updatedPlaylists = prevPlaylists.map((prevPlaylist) =>
                prevPlaylist.id === playlist.id
                  ? { ...prevPlaylist, videos: videoItems }
                  : prevPlaylist
              );
              return updatedPlaylists;
            });
          } catch (error) {
            console.error(
              `Error fetching videos for playlist ${playlist.id}:`,
              error
            );
          }
        });
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleMouseEnter = (videoId) => {
    setTimeout(() => {
      setHoveredVideo(videoId);
    }, 1000); 
  };

  return (
    <div className="content">
      <div className="title-cards" style={{ padding: "10px 40px" }}>
        {playlists.map((playlist, index) => (
          <div key={index} className="row">
            <h6 className="rowHeader">{playlist.title}</h6>
            <div className="cardRow">
              {playlist.videos &&
                playlist.videos.map((video, index) => (
                  <div key={index} className="card">
                    <div className="card-wrapper">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="cardImage"
                        
                      />
                      <div
                        className="card-hover"
                        onMouseLeave={() => setHoveredVideo(null)}
                      >
                        {hoveredVideo === video.id ? (
                          <iframe 
                            title="video"
                            className="cardImage-Hover"
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&controls=0`}
                          />
                        ) : (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="cardImage-Hover"
                            onMouseEnter={() => handleMouseEnter(video.id)}
                          />
                        )}
                        <div className="card-container">
                          <div className="cardHover-btns">
                            <button className="play-btn">
                              <Link
                                to={`/video/${video.id}`}
                                className="play-btn-link"
                                videoId={video.id}
                              >
                                <FontAwesomeIcon icon={faPlay} />
                              </Link>
                            </button>

                            <button className="remove-btn">{"+"}</button>
                            <button className="like-btn">
                              <FontAwesomeIcon icon={faThumbsUp} />
                            </button>
                            <button className="moreInfo-btn">
                              <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
