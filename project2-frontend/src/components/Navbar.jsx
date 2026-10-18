import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, Music } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isArtist } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <header className="h-16 bg-[#101010]/95 backdrop-blur-md px-8 flex items-center justify-between border-b border-[#222] sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Music className="text-[#1db954]" size={22} />
          <span>Stream Studio</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#202020] px-3 py-1.5 rounded-full border border-[#333]">
              <div className="w-6 h-6 rounded-full bg-[#1db954] text-black font-bold flex items-center justify-center text-xs">
                {user.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium text-white">{user.username}</span>
              {isArtist && (
                <span className="text-[10px] bg-[#1db954]/20 text-[#1db954] font-semibold px-2 py-0.5 rounded-full">
                  Artist
                </span>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#252525] hover:bg-[#333] text-gray-300 hover:text-white rounded-full text-xs font-semibold transition"
            >
              <LogOut size={14} />
              <span>Log out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/auth?mode=register"
              className="text-[#b3b3b3] hover:text-white font-semibold text-sm transition"
            >
              Sign up
            </Link>
            <Link
              to="/auth?mode=login"
              className="bg-white hover:bg-gray-200 text-black font-bold text-sm px-6 py-2 rounded-full transition-transform active:scale-95"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

