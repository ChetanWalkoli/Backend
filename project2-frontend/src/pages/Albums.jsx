import { useEffect, useState } from 'react';
import API from '../services/api';
import AlbumCard from '../components/AlbumCard';
import { Disc3 } from 'lucide-react';

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/music/albums')
      .then((res) => {
        setAlbums(res.data?.albums || []);
      })
      .catch((err) => {
        console.error('Failed to fetch albums:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#222]">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Disc3 className="text-[#1db954]" size={24} />
            <span>All Albums</span>
          </h2>
          <p className="text-xs text-[#888] mt-1">
            Browse compilation records and collections created by verified artists.
          </p>
        </div>
        <span className="text-xs text-[#777] bg-[#181818] px-3 py-1 rounded-full border border-[#282828]">
          {albums.length} Available
        </span>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-[#777] gap-3">
          <div className="w-8 h-8 border-2 border-[#1db954] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm">Loading albums...</p>
        </div>
      ) : albums.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {albums.map((album) => (
            <AlbumCard key={album._id || album.id} album={album} />
          ))}
        </div>
      ) : (
        <div className="py-20 bg-[#181818] rounded-2xl text-center text-[#777] border border-[#222]">
          <p className="text-base font-semibold text-white">No albums found</p>
          <p className="text-xs text-[#555] mt-1">
            When an artist publishes an album, it will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

