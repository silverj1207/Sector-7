import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-play might be blocked by browser policies until user interacts
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        // Auto-play blocked, wait for user interaction
        setIsPlaying(false);
      }
    };
    
    if (hasInteracted) {
      playAudio();
    }
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!hasInteracted) setHasInteracted(true);
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2.5">
      <audio
        ref={audioRef}
        src="https://www.dropbox.com/scl/fi/zkx28s9scfoxxoq6yrsj7/SECTOR-7.mp3?rlkey=mxb68kxxdteecg5in5b5slo2k&st=mswcolbf&raw=1"
        loop
      />
      <button
        onClick={togglePlay}
        className="text-zinc-400 hover:text-green-400 transition-colors flex items-center justify-center"
        aria-label={isPlaying ? "Mute BGM" : "Play BGM"}
      >
        {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
      <div className="text-left font-mono text-[11px] space-y-0.5">
        <span className="text-zinc-500 block">AUDIO SECURE</span>
        <span className="text-emerald-400 font-black">{isPlaying ? "PLAYING" : "MUTED"}</span>
      </div>
    </div>
  );
};
