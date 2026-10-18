import { NavLink } from 'react-router-dom';
import { Home, Disc3, PlusSquare, Library, Music, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, isArtist } = useAuth();

  return (
    <aside className="w-64 bg-[#121212] flex flex-col justify-between p-4 select-none border-r border-[#222]">
      {/* Brand logo */}
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-10 h-10 bg-[#1db954] rounded-full flex items-center justify-center text-black font-black text-xl shadow-lg shadow-[#1db954]/20">
            ♫
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Spotify Clone</span>
        </div>

        {/* Primary Navigation */}
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2.5 rounded-md font-medium text-sm transition-colors ${
                isActive ? 'text-white bg-[#282828]' : 'text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a]'
              }`
            }
          >
            <Home size={20} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/albums"
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2.5 rounded-md font-medium text-sm transition-colors ${
                isActive ? 'text-white bg-[#282828]' : 'text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a]'
              }`
            }
          >
            <Disc3 size={20} />
            <span>Albums</span>
          </NavLink>

          {/* Artist Studio Links */}
          {isArtist && (
            <div className="mt-4 pt-4 border-t border-[#282828]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#777] px-3">
                Artist Studio
              </span>
              <div className="flex flex-col gap-1.5 mt-2">
                <NavLink
                  to="/artist/upload"
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                      isActive ? 'text-[#1db954] bg-[#1a2e20]' : 'text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a]'
                    }`
                  }
                >
                  <PlusSquare size={18} />
                  <span>Upload Music</span>
                </NavLink>

                <NavLink
                  to="/artist/create-album"
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                      isActive ? 'text-[#1db954] bg-[#1a2e20]' : 'text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a]'
                    }`
                  }
                >
                  <Disc3 size={18} />
                  <span>Create Album</span>
                </NavLink>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* User Info / Role Badge */}
      <div className="p-3 bg-[#181818] rounded-xl border border-[#262626]">
        {user ? (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm text-white truncate max-w-[130px]">
                {user.username}
              </span>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  isArtist
                    ? 'bg-[#1db954]/20 text-[#1db954] border border-[#1db954]/40'
                    : 'bg-[#333] text-gray-300'
                }`}
              >
                {user.role}
              </span>
            </div>
            <p className="text-xs text-[#888] truncate">{user.email}</p>
          </div>
        ) : (
          <div className="text-center py-1">
            <p className="text-xs text-[#888] mb-2">Sign in to play full tracks & albums</p>
            <NavLink
              to="/auth"
              className="inline-block w-full py-1.5 bg-[#1db954] hover:bg-[#1ed760] text-black font-bold text-xs rounded-full transition-transform active:scale-95"
            >
              Sign In
            </NavLink>
          </div>
        )}
      </div>
    </aside>
  );
}

