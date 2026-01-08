import React, { useRef, useState } from 'react';

const BackgroundMusic = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000]">
      <audio ref={audioRef} loop>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <button 
        className={`w-[50px] h-[50px] opacity-25 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 shadow-lg bg-white/80 hover:bg-white hover:scale-110 text-black-600 ${
          isPlaying ? 'motion-safe:animate-pulse' : 'motion-safe:animate-pulse'
        }`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? 
        <i className='bx bx-volume-full text-2xl'></i> : <i className='bx bx-volume-mute text-2xl'></i>}
      </button>
    </div>
  );
};

export default BackgroundMusic;
