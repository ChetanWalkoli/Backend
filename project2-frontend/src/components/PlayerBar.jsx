import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const formatTime = (secs) => {
  if (isNaN(secs) || secs === Infinity) return '0:00';
  const minutes = Math.floor(secs / 60);
  const remainingSeconds = Math.floor(secs % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    setVolume,
  } = usePlayer();

  const handleSeek = (e) => {
    seek(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="h-24 bg-[#181818] border-t border-[#282828] px-6 flex items-center justify-between select-none fixed bottom-0 left-0 right-0 z-30">
      {/* Left: Track Information */}
      <div className="flex items-center gap-4 w-1/4 min-w-[200px]">
        {currentTrack ? (
          <>
            <div className="w-14 h-14 bg-gradient-to-br from-[#1db954]/30 to-[#121212] border border-[#333] rounded-md flex items-center justify-center flex-shrink-0 shadow-md">
              <Music2 className="text-[#1db954]" size={26} />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-white font-semibold text-sm truncate hover:underline cursor-pointer">
                {currentTrack.title}
              </h4>
              <p className="text-[#b3b3b3] text-xs truncate">
                {currentTrack.artist?.username || currentTrack.artist || 'Unknown Artist'}
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3 text-[#777]">
            <div className="w-12 h-12 bg-[#222] rounded-md flex items-center justify-center">
              <Music2 size={20} />
            </div>
            <span className="text-xs">No track playing</span>
          </div>
        )}
      </div>

      {/* Center: Playback Controls & Progress Bar */}
      <div className="flex flex-col items-center gap-2 w-2/4 max-w-xl">
        <div className="flex items-center gap-6">
          <button
            onClick={playPrevious}
            className="text-[#b3b3b3] hover:text-white transition disabled:opacity-30"
            disabled={!currentTrack}
            title="Previous"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={togglePlay}
            disabled={!currentTrack}
            className="w-10 h-10 bg-white hover:scale-105 active:scale-95 text-black rounded-full flex items-center justify-center transition disabled:opacity-40 disabled:hover:scale-100 shadow-md"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
          </button>

          <button
            onClick={playNext}
            className="text-[#b3b3b3] hover:text-white transition disabled:opacity-30"
            disabled={!currentTrack}
            title="Next"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Timeline Slider */}
        <div className="w-full flex items-center gap-3">
          <span className="text-[11px] text-[#b3b3b3] w-9 text-right font-mono">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            disabled={!currentTrack}
            className="w-full h-1 bg-[#4d4d4d] rounded-lg appearance-none cursor-pointer accent-[#1db954] hover:accent-[#1ed760] transition"
          />
          <span className="text-[11px] text-[#b3b3b3] w-9 font-mono">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right: Volume Control */}
      <div className="flex items-center justify-end gap-3 w-1/4">
        <button
          onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
          className="text-[#b3b3b3] hover:text-white transition"
        >
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-[#4d4d4d] rounded-lg appearance-none cursor-pointer accent-white hover:accent-[#1db954] transition"
        />
      </div>
    </div>
  );
}

