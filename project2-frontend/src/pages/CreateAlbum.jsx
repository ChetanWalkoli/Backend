import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Disc3, Check, AlertCircle, Music } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CreateAlbum() {
  const { isArtist } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [availableSongs, setAvailableSongs] = useState([]);
  const [selectedSongIds, setSelectedSongIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [songsLoading, setSongsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/music/')
      .then((res) => {
        setAvailableSongs(res.data?.musics || []);
      })
      .catch((err) => {
        console.error('Failed to load songs for album:', err);
      })
      .finally(() => {
        setSongsLoading(false);
      });
  }, []);

  const toggleSongSelection = (id) => {
    setSelectedSongIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an album title.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await API.post('/music/album', {
        title: title.trim(),
        musicIds: selectedSongIds,
      });

      const albumId = res.data?.album?.id || res.data?.album?._id;
      if (albumId) {
        navigate(`/album/${albumId}`);
      } else {
        navigate('/albums');
      }
    } catch (err) {
      console.error('Failed to create album:', err);
      setError(err.response?.data?.message || 'Failed to create album.');
    } finally {
      setLoading(false);
    }
  };

  if (!isArtist) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <AlertCircle className="text-yellow-500 mx-auto mb-3" size={40} />
        <h2 className="text-xl font-bold text-white mb-2">Artist Access Required</h2>
        <p className="text-sm text-[#888] mb-6">
          Only artists can group tracks into albums.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Disc3 className="text-[#1db954]" size={28} />
          <span>Create New Album</span>
        </h2>
        <p className="text-sm text-[#888] mt-1">
          Group your uploaded music tracks into a cohesive album collection.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-800 text-red-200 rounded-xl text-sm flex items-center gap-3">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-[#181818] p-8 rounded-2xl border border-[#282828] shadow-2xl">
        {/* Album Title */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#b3b3b3]">
            Album Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. After Hours"
            className="w-full px-4 py-3 bg-[#121212] border border-[#333] rounded-lg text-white text-sm focus:border-[#1db954] focus:outline-none transition"
            required
          />
        </div>

        {/* Track Selection */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#b3b3b3]">
              Select Tracks for this Album
            </label>
            <span className="text-xs text-[#1db954] font-semibold">
              {selectedSongIds.length} Selected
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto bg-[#121212] border border-[#333] rounded-xl p-2 divide-y divide-[#202020]">
            {songsLoading ? (
              <p className="text-xs text-[#777] p-4 text-center">Loading songs...</p>
            ) : availableSongs.length > 0 ? (
              availableSongs.map((song) => {
                const songId = song._id || song.id;
                const isSelected = selectedSongIds.includes(songId);

                return (
                  <div
                    key={songId}
                    onClick={() => toggleSongSelection(songId)}
                    className="flex items-center justify-between p-2.5 hover:bg-[#1a1a1a] rounded-lg cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <Music size={16} className={isSelected ? 'text-[#1db954]' : 'text-[#666]'} />
                      <span className={`text-sm truncate ${isSelected ? 'text-white font-medium' : 'text-[#bbb]'}`}>
                        {song.title}
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                        isSelected
                          ? 'bg-[#1db954] border-[#1db954] text-black'
                          : 'border-[#444] bg-[#222]'
                      }`}
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-[#666] p-4 text-center">
                No songs available. Upload some songs first!
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#1db954] hover:bg-[#1ed760] disabled:bg-[#1db954]/50 text-black font-bold text-sm rounded-full transition shadow-lg flex items-center justify-center gap-2 transform active:scale-98"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Album...</span>
            </>
          ) : (
            <>
              <Disc3 size={18} />
              <span>Create Album</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

