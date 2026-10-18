import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { Disc3, Play, Pause, Clock, ArrowLeft, Music2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function AlbumDetails() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentTrack, isPlaying, playTrack } = usePlayer();

  useEffect(() => {
    setLoading(true);
    API.get(`/music/album/${albumId}`)
      .then((res) => {
        setAlbum(res.data?.album);
      })
      .catch((err) => {
        console.error('Failed to load album details:', err);
        setError('Could not load album. Please make sure you are logged in.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [albumId]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-[#777] gap-3">
        <div className="w-8 h-8 border-2 border-[#1db954] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm">Loading album tracks...</p>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-400 mb-4">{error || 'Album not found'}</p>
        <Link
          to="/albums"
          className="inline-flex items-center gap-2 text-sm text-[#1db954] hover:underline"
        >
          <ArrowLeft size={16} />
          <span>Back to Albums</span>
        </Link>
      </div>
    );
  }

  const tracks = album.musics || [];
  const isAlbumPlaying =
    isPlaying && tracks.some((t) => (t._id || t.id) === (currentTrack?._id || currentTrack?.id));

  const handlePlayAlbum = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Back button */}
      <Link
        to="/albums"
        className="inline-flex items-center gap-2 text-xs text-[#b3b3b3] hover:text-white transition w-fit"
      >
        <ArrowLeft size={16} />
        <span>Back to Albums</span>
      </Link>

      {/* Album Header Banner */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 bg-gradient-to-b from-[#252525] to-[#121212] p-8 rounded-2xl border border-[#282828] shadow-2xl">
        <div className="w-48 h-48 rounded-xl bg-gradient-to-tr from-[#121212] via-[#202020] to-[#2c2c2c] flex items-center justify-center flex-shrink-0 shadow-2xl border border-[#333]">
          <Disc3 className="text-[#1db954]" size={80} />
        </div>

        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-xs uppercase tracking-wider font-bold text-[#b3b3b3]">
            Album Collection
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {album.title}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-[#b3b3b3] mt-2">
            <span className="font-semibold text-white">
              {album.artist?.username || 'Artist'}
            </span>
            <span>•</span>
            <span>{tracks.length} Songs</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      {tracks.length > 0 && (
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayAlbum}
            className="w-14 h-14 bg-[#1db954] hover:bg-[#1ed760] text-black rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95"
            title="Play Album"
          >
            {isAlbumPlaying ? (
              <Pause size={26} fill="currentColor" />
            ) : (
              <Play size={26} fill="currentColor" className="ml-1" />
            )}
          </button>
        </div>
      )}

      {/* Tracklist Table */}
      <div className="flex flex-col">
        <div className="grid grid-cols-12 text-xs font-semibold text-[#777] uppercase tracking-wider pb-3 border-b border-[#282828] px-4">
          <span className="col-span-1">#</span>
          <span className="col-span-8">Title</span>
          <span className="col-span-3 text-right">Stream</span>
        </div>

        {tracks.length > 0 ? (
          <div className="divide-y divide-[#1e1e1e]">
            {tracks.map((track, idx) => {
              const isCurrent =
                (currentTrack?._id || currentTrack?.id) === (track._id || track.id);
              const isTrackPlaying = isCurrent && isPlaying;

              return (
                <div
                  key={track._id || track.id}
                  onClick={() => playTrack(track, tracks)}
                  className={`grid grid-cols-12 items-center px-4 py-3 rounded-lg hover:bg-[#202020] transition cursor-pointer group ${
                    isCurrent ? 'bg-[#1c2e22]' : ''
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    {isTrackPlaying ? (
                      <Pause size={16} className="text-[#1db954]" />
                    ) : (
                      <span
                        className={`text-sm ${
                          isCurrent ? 'text-[#1db954] font-bold' : 'text-[#777] group-hover:text-white'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    )}
                  </div>

                  <div className="col-span-8 flex flex-col">
                    <span
                      className={`text-sm font-semibold truncate ${
                        isCurrent ? 'text-[#1db954]' : 'text-white'
                      }`}
                    >
                      {track.title}
                    </span>
                    <span className="text-xs text-[#888] truncate">
                      {album.artist?.username || 'Artist'}
                    </span>
                  </div>

                  <div className="col-span-3 flex justify-end items-center">
                    <span className="text-xs text-[#1db954] bg-[#1db954]/10 border border-[#1db954]/30 px-2 py-0.5 rounded-full font-mono">
                      MP3 Audio
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-[#666]">
            This album has no songs attached yet.
          </div>
        )}
      </div>
    </div>
  );
}

