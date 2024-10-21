import { useRef, useState } from 'react';

const HomeVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full flex justify-center ">
      <video
        className="w-[80%]"
        ref={videoRef}
        width="640"
        height="400"
        style={{
          width: '100%',
          height: '100%',
        }}
        muted={isMuted}
        controls
        autoPlay
        onClick={handlePlayPause}
      >
        <source src="/video/purwanchal.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        {/* Play/Pause button */}
        {/* <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button> */}

        {/* Mute/Unmute button */}
        {/* <button onClick={handleMuteUnmute}>
          {isMuted ? 'Unmute' : 'Mute'}
        </button> */}
      </div>
    </div>
  );
};

// const HomeVideo = () => {
//   return (
//     <div>
//       {/* <iframe
//         width="560"
//         height="315"
//         src="https://www.youtube.com/embed/VIDEO_ID"
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe> */}
//       <iframe
//         width="1217"
//         height="685"
//         src="https://www.youtube.com/embed/NcVwnPXxTpk?autoplay=1&loop=1&playlist=NcVwnPXxTpk"
//         title="How To Embed YouTube Videos in React / Gatsby (and make them Responsive)"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         referrerPolicy="strict-origin-when-cross-origin"
//         allowfullscreen
//       ></iframe>
//     </div>
//   );
// };

export default HomeVideo;
