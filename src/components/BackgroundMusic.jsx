import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import musicFile from '../assets/Music/BackgroundMusic.mp3';

const START_TIME_SECONDS = 2 * 60 + 55;

const seekToStartIfNeeded = (audio) => {
  if (!audio) {
    return;
  }

  const duration = audio.duration;
  if (!Number.isFinite(duration) || duration <= 0) {
    audio.currentTime = START_TIME_SECONDS;
    return;
  }

  if (audio.currentTime < START_TIME_SECONDS) {
    audio.currentTime = Math.min(START_TIME_SECONDS, duration);
  }
};

const BackgroundMusic = forwardRef(({ autoPlay = false, showButton = true }, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    seekToStartIfNeeded(audio);
    audio.play().catch((error) => {
      console.warn('Playback was blocked by the browser:', error);
    });
  };

  useImperativeHandle(ref, () => ({
    play: playAudio,
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!autoPlay || !audio) {
      return;
    }

    const tryPlay = async () => {
      try {
        playAudio();
      } catch (error) {
        console.warn('Autoplay was blocked by the browser:', error);
      }
    };

    tryPlay();
  }, [autoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    seekToStartIfNeeded(audio);

    const handleLoadedMetadata = () => {
      seekToStartIfNeeded(audio);
    };

    const handleCanPlay = () => {
      seekToStartIfNeeded(audio);
    };

    const handlePlay = () => {
      seekToStartIfNeeded(audio);
      setIsPlaying(true);
    };

    const handlePause = () => setIsPlaying(false);

    const handleEnded = () => {
      seekToStartIfNeeded(audio);
      audio.play().catch((error) => {
        console.warn('Loop playback was blocked by the browser:', error);
      });
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        return;
      }

      playAudio();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000]">
      <audio ref={audioRef} preload="metadata">
        <source src={musicFile} type="audio/mpeg" />
        Peramban Anda tidak mendukung pemutar audio.
      </audio>
      
      {showButton ? (
        <button 
          className={`w-[50px] h-[50px] opacity-25 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 shadow-lg bg-white/80 hover:bg-white hover:scale-110 text-black-600 ${
            isPlaying ? 'motion-safe:animate-pulse' : 'motion-safe:animate-pulse'
          }`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
        >
          {isPlaying ? 
          <i className='bx bx-volume-full text-2xl'></i> : <i className='bx bx-volume-mute text-2xl'></i>}
        </button>
      ) : null}
    </div>
  );
});

export default BackgroundMusic;
