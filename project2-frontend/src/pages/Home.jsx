import { useEffect, useState } from 'react';
import API from '../services/api';
import SongCard from '../components/SongCard';
import AlbumCard from '../components/AlbumCard';
import { Sparkles, Music2, Disc3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [songsRes, albumsRes] = await Promise.all([
          API.get('/music/').catch((err) => {
            console.warn('Songs fetch failed (might require login):', err);
            return { data: { musics: [] } };
          }),
          API.get('/music/albums').catch((err) => {
            console.warn('Albums fetch failed (might require login):', err);
            return { data: { albums: [] } };
          }),
        ]);

        setSongs(songsRes.data?.musics || []);
        setAlbums(albumsRes.data?.albums || []);
      } catch (err) {
        console.error('Failed to load home content:', err);
        setError('Could not load stream library. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Welcome */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#1db954]/20 via-[#181818] to-[#121212] p-8 border border-[#282828] overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1db954]/20 text-[#1db954] text-xs font-semibold rounded-full mb-4 border border-[#1db954]/30">
            <Sparkles size={14} />
            <span>Spotify Clone Audio Stream</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Welcome{user ? `, ${user.username}` : ''}
          </h2>
          <p className="text-sm text-[#b3b3b3]">
            Listen to high-fidelity songs uploaded through ImageKit, stream full audio albums, and discover new creators.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-[#777] gap-3">
          <div className="w-8 h-8 border-2 border-[#1db954] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm">Fetching songs & albums...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-900/30 border border-red-800 text-red-300 rounded-lg text-sm text-center">
          {error}
        </div>
      ) : (
        <>
          {/* Songs Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Music2 className="text-[#1db954]" size={20} />
                <span>Popular Tracks</span>
              </h3>
              <span className="text-xs text-[#777]">{songs.length} Tracks</span>
            </div>

            {songs.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {songs.map((song) => (
                  <SongCard key={song._id || song.id} track={song} playlist={songs} />
                ))}
              </div>
            ) : (
              <div className="py-12 bg-[#181818] rounded-xl text-center text-[#777] border border-[#222]">
                <p className="text-sm">No tracks uploaded yet.</p>
                <p className="text-xs text-[#555] mt-1">
                  Log in as an artist to upload your first audio track!
                </p>
              </div>
            )}
          </section>

          {/* Albums Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Disc3 className="text-[#1db954]" size={20} />
                <span>Featured Albums</span>
              </h3>
              <span className="text-xs text-[#777]">{albums.length} Albums</span>
            </div>

            {albums.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {albums.map((album) => (
                  <AlbumCard key={album._id || album.id} album={album} />
                ))}
              </div>
            ) : (
              <div className="py-12 bg-[#181818] rounded-xl text-center text-[#777] border border-[#222]">
                <p className="text-sm">No albums created yet.</p>
                <p className="text-xs text-[#555] mt-1">
                  Artists can group songs into custom albums in the Artist Studio.
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

