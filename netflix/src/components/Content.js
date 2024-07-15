import React, { useState, useEffect, useRef } from "react";
import "./content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faThumbsUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;


export default function Contents() {
  const [playlists, setPlaylists] = useState([]);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [scrollIndices, setScrollIndices] = useState({});
  // const containerRef = useRef(null);
  const cardWidth = 230; // Width of each card including padding/margin
  const cardsPerRow = 5; // Number of cards visible in one row

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistsResponse = await fetch(
          `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UC8butISFwT-Wl7EV0hUK0BQ&maxResults=10&key=${apiKey}` 
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
              `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=${playlist.id}&key=${apiKey}` 
            );
            const videosData = await videosResponse.json();
            const videoItems = videosData.items.map((item) => ({
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.high.url,
            }));

            // Update the playlist with its videos
            setPlaylists((prevPlaylists) =>
              prevPlaylists.map((prevPlaylist) =>
                prevPlaylist.id === playlist.id
                  ? { ...prevPlaylist, videos: videoItems }
                  : prevPlaylist
              )
            );
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

  const scrollRow = (index, direction, maxScrollIndex) => {
    setScrollIndices((prevScrollIndices) => {
      let newScrollIndex =
        direction === "left"
          ? Math.min((prevScrollIndices[index] || 0) + 1200, 0)
          : Math.max(
            (prevScrollIndices[index] || 0) - 1200,
            -maxScrollIndex
          );

      // Cycle through to the beginning/end if reaching the end/beginning
      if (newScrollIndex === -maxScrollIndex && direction === "right") {
        newScrollIndex = 0;
      }

      return {
        ...prevScrollIndices,
        [index]: newScrollIndex,
      };
    });
  };

  const calculateMaxScrollIndex = (videosLength) => {
    return videosLength > cardsPerRow ? videosLength * cardWidth : 0;
  };

  // Function to generate progress bars
  const progressFunc = (totVideos, scrollIndex) => {
    const progressBars = [];
    for (let i = 0; i < totVideos / 5; i++) {

      if((scrollIndex === 0 && i===0) ||(scrollIndex!==0 && (scrollIndex/i)/1200===-1) ) 
        progressBars.push(<span key={i} className="slideProgress" style={{"backgroundColor":"white"}}></span>);
      
      else progressBars.push(<span key={i} className="slideProgress"></span>);
    }
    return progressBars;
  };

  return (
    <div className="content" >
      <div className="title-cards">
        {playlists.map((playlist, index) => {
          const scrollIndex = scrollIndices[index] || 0;
          const maxScrollIndex = calculateMaxScrollIndex(
            playlist.videos ? playlist.videos.length : 0
          );

          return (
            <div key={index} className="rows">
              <h6 className="rowHeader">{playlist.title}</h6>

              <div className="progressBars">
 {/* Render progress bars if maxScrollIndex is greater than 0 */}
                {maxScrollIndex > 0 ? progressFunc(playlist.videos.length, scrollIndex) : <span  className="slideProgress" style={{"backgroundColor":"transparent"}}></span>}
              </div>

              {scrollIndex < 0 && (
                <button
                  className="handleLeft"
                  onClick={() => scrollRow(index, "left", maxScrollIndex)}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              )}
              <div
                className="cardRow"
                style={{ "--scroll-index": `${scrollIndex}px` }}
              >
                {playlist.videos &&
                  playlist.videos.map((video, videoIndex) => (
                    <div key={videoIndex} className="card">
                      <div className="card-wrapper">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="cardImage"
                        />
                        <div
                          className="card-hover" style={{"--leftvalue":`${videoIndex%5*(-20)}px`}}
                          onMouseLeave={() => setHoveredVideo(null)}
                        >
                          {hoveredVideo === video.id ? (
                            <iframe
                              title="video"
                              className="cardImage-Hover"
                              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&controls=0&`}
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
              {scrollIndex > -maxScrollIndex &&
                playlist.videos.length > cardsPerRow && (
                  <button
                    className="handleRight"
                    onClick={() => scrollRow(index, "right", maxScrollIndex)}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
