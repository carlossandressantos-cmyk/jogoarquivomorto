import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(err => {
        console.log('Autoplay blocked:', err);
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMute}
        className="p-3 bg-gray-900/80 hover:bg-gray-800/80 rounded-full backdrop-blur-sm transition-colors"
        aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-gray-400" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>
      <audio ref={audioRef} loop>
        <source src="/assets/audio.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
