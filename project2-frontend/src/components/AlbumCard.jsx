import { useNavigate } from 'react-router-dom';
import { Disc3 } from 'lucide-react';

export default function AlbumCard({ album }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${album._id || album.id}`)}
      className="group relative bg-[#181818] hover:bg-[#282828] p-4 rounded-xl transition duration-300 cursor-pointer flex flex-col gap-3 shadow-md border border-[#222] hover:border-[#333]"
    >
      {/* Vinyl record aesthetic */}
      <div className="relative aspect-square w-full rounded-lg bg-gradient-to-tr from-[#121212] via-[#202020] to-[#2c2c2c] flex items-center justify-center overflow-hidden shadow-inner">
        <Disc3 className="text-[#666] group-hover:text-[#1db954] transition duration-500 group-hover:rotate-45" size={56} />
      </div>

      <div className="flex flex-col">
        <h3 className="font-semibold text-sm text-white truncate group-hover:text-[#1db954] transition">
          {album.title}
        </h3>
        <p className="text-xs text-[#b3b3b3] truncate mt-1">
          By {album.artist?.username || 'Unknown Artist'}
        </p>
      </div>
    </div>
  );
}

