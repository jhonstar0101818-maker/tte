import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Track } from "@/data/album";
import { Button } from "@/components/ui/button";

interface MusicPlayerProps {
  currentTrack: Track | null;
  tracks: Track[];
  onTrackChange: (track: Track) => void;
}

export default function MusicPlayer({
  currentTrack,
  tracks,
  onTrackChange,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
      if (currentIndex > 0) {
        onTrackChange(tracks[currentIndex - 1]);
      }
    }
  };

  const handleNext = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
      if (currentIndex < tracks.length - 1) {
        onTrackChange(tracks[currentIndex + 1]);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-slate-800 border-t border-border/50 backdrop-blur-sm z-40">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />

      <div className="container py-4 space-y-3">
        {/* Track Info */}
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-white/60">
              Track {currentTrack.id} of {tracks.length}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer accent-primary"
          />
          <span className="text-xs text-white/60 w-10">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handlePrevious}
              disabled={!currentTrack || currentTrack.id === 1}
              className="text-white hover:bg-white/10"
            >
              <SkipBack className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              onClick={handlePlayPause}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleNext}
              disabled={!currentTrack || currentTrack.id === tracks.length}
              className="text-white hover:bg-white/10"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-white/60" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-white/20 rounded-full cursor-pointer accent-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
