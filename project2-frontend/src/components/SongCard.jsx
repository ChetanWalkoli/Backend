import { Play, Pause, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function SongCard({ track, playlist = [] }) {
  const { currentTrack, isPlaying, playTrack } = usePlayer();

  const isCurrent = (currentTrack?._id || currentTrack?.id) === (track._id || track.id);
  const isCurrentPlaying = isCurrent && isPlaying;

  const handlePlayClick = (e) => {
    e.stopPropagation();
    playTrack(track, playlist);
  };

  return (
    <div
      onClick={handlePlayClick}
      className="group relative bg-[#181818] hover:bg-[#282828] p-4 rounded-xl transition duration-300 cursor-pointer flex flex-col gap-3 shadow-md border border-[#222] hover:border-[#333]"
    >
      {/* Vinyl / Cover Art */}
      <div className="relative aspect-square w-full rounded-lg bg-gradient-to-br from-[#2a2a2a] via-[#1c1c1c] to-[#121212] flex items-center justify-center overflow-hidden shadow-inner">
        <Music className="text-[#555] group-hover:text-[#1db954] transition duration-300" size={48} />

        {/* Floating Play Button */}
        <button
          onClick={handlePlayClick}
          className={`absolute bottom-3 right-3 w-11 h-11 bg-[#1db954] hover:bg-[#1ed760] text-black rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform ${
            isCurrentPlaying
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-105'
          }`}
          title={isCurrentPlaying ? 'Pause' : 'Play'}
        >
          {isCurrentPlaying ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" className="ml-0.5" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <h3
          className={`font-semibold text-sm truncate ${
            isCurrent ? 'text-[#1db954]' : 'text-white'
          }`}
        >
          {track.title}
        </h3>
        <p className="text-xs text-[#b3b3b3] truncate mt-1">
          {track.artist?.username || track.artist || 'Unknown Artist'}
        </p>
      </div>
    </div>
  );
}

