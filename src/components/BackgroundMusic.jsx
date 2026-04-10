import React, { useEffect, useRef, useState } from 'react';
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

const BackgroundMusic = ({ autoPlay = false }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!autoPlay || !audio) {
      return;
    }

    const tryPlay = async () => {
      try {
        seekToStartIfNeeded(audio);
        await audio.play();
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
      audio.muted = isMuted;
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

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      const nextMuted = !audio.muted;
      audio.muted = nextMuted;
      setIsMuted(nextMuted);

      if (audio.paused) {
        seekToStartIfNeeded(audio);
        audio.play().catch((error) => {
          console.warn('Playback was blocked by the browser:', error);
        });
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000]">
      <audio ref={audioRef} preload="metadata">
        <source src={musicFile} type="audio/mpeg" />
        Peramban Anda tidak mendukung pemutar audio.
      </audio>
      
      <button 
        className={`w-[50px] h-[50px] opacity-25 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 shadow-lg bg-white/80 hover:bg-white hover:scale-110 text-black-600 ${
          isPlaying ? 'motion-safe:animate-pulse' : 'motion-safe:animate-pulse'
        }`}
        onClick={toggleMute}
        aria-label={isMuted ? 'Aktifkan suara' : 'Matikan suara'}
      >
        {isMuted ? 
        <i className='bx bx-volume-mute text-2xl'></i> : <i className='bx bx-volume-full text-2xl'></i>}
      </button>
    </div>
  );
};

export default BackgroundMusic;
