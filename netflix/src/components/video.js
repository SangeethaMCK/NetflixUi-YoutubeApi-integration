import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faStepForward,
  faClosedCaptioning,
  faVolumeMute,
  faExpand,
  faBackward,
  faForward,
  faGaugeSimpleHigh,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";
import "./video.css";
import { useParams } from "react-router-dom";

// import { SpriteGenerator } from 'sprite-vtt-generator';


function VideoPlayer() {
  const { videoId } = useParams();
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  window.onkeydown = function (e) {
    e.preventDefault();
    switch (e.key) {
      case " ": togglePlayPause(); break;
      case "ArrowLeft": tenSecPrevious(); break;
      case "ArrowRight": tenSecNext(); break;
      case "ArrowUp": changePlaybackSpeed(2); break;
      case "ArrowDown": changePlaybackSpeed(0.5); break;
      default: return;
    }
  };

  // useEffect(() => {
  //   const handleFullscreenChange = () => {
  //     setFullscreen(document.fullscreenElement === playerRef.current.wrapper);
  //   };

  //   document.addEventListener("fullscreenchange", handleFullscreenChange);

  //   return () => {
  //     document.removeEventListener("fullscreenchange", handleFullscreenChange);
  //   };
  // }, []);

  const togglePlayPause = () => {
    console.log("togglePlayPause");
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    const playerElement = playerRef.current.wrapper;
    if (!fullscreen && playerElement.requestFullscreen) {
      document.body.requestFullscreen(); //
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeekChange = (e) => {
    const seekTo = parseFloat(e.target.value);
    setPlayed(seekTo);
    playerRef.current.seekTo(seekTo);
  };

  const formatTime = (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  };

  const tenSecPrevious = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const tenSecNext = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const changePlaybackSpeed = (value) => {
    setPlaybackRate(value);
  };

  const subTitles = () => {};
  const nextEpisode = () => {};

  return (
    <div className="video-player-container">
      <div className="videoTime-controls">
        <div className="progress-container">
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeekChange}
            className="progress-range"
          />
          <span>{formatTime(duration - duration * played)}</span>
        </div>
      </div>
      <div className="video-controls">
        <div className="control-button-left">
          <button onClick={togglePlayPause} className="control-button">
            <FontAwesomeIcon icon={playing ? faPause : faPlay} />
          </button>
          <button onClick={tenSecPrevious} className="control-button">
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button onClick={tenSecNext} className="control-button">
            <FontAwesomeIcon icon={faForward} />
          </button>
          <button onClick={toggleMute} className="control-button">
            <FontAwesomeIcon icon={muted ? faVolumeMute : faVolumeUp} />
          </button>
        </div>
        <div className="control-button-right">
          <button onClick={nextEpisode} className="control-button">
            <FontAwesomeIcon icon={faStepForward} />
          </button>
          <button onClick={subTitles} className="control-button">
            <FontAwesomeIcon icon={faClosedCaptioning} />
          </button>
          <button className="control-button" id="speed-button">
            <table className="playback-rate-table">
              <tbody>
                <tr>
                  <td onClick={() => changePlaybackSpeed(0.5)}>0.5</td>
                  <td onClick={() => changePlaybackSpeed(1)}>1</td>
                  <td onClick={() => changePlaybackSpeed(1.5)}>1.5</td>
                  <td onClick={() => changePlaybackSpeed(2)}>2</td>
                </tr>
              </tbody>
            </table>
            <FontAwesomeIcon icon={faGaugeSimpleHigh} />
          </button>
          <button onClick={toggleFullscreen} className="control-button">
            <FontAwesomeIcon icon={fullscreen ? faCompress : faExpand} />
          </button>
        </div>
      </div>
      {videoId && (
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${videoId}`}
          playing={playing}
          muted={muted}
        width={"100%"}
        height={"100%"}
        // controls={true}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          onDuration={handleDuration}
          controls={false}
          // onPause={togglePlayPause}
          // onPlay={togglePlayPause}
        />
      )}
    </div>
  );
}

export default VideoPlayer;


// playlist: https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UC8butISFwT-Wl7EV0hUK0BQ&maxResults=1&key=AIzaSyC5hucyjipJJmjhoTrXJW6D3p2jvq9Jjbg'
// video: 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=UU1VDpWpOf36CuP9fowyDZtQ&key=AIzaSyC5hucyjipJJmjhoTrXJW6D3p2jvq9Jjbg'