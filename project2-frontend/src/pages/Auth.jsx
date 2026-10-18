import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Music, AlertCircle, Headphones, Mic2 } from 'lucide-react';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('user'); // 'user' or 'artist'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (mode === 'login') {
      const res = await login({ username: username || email, email, password });
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message);
      }
    } else {
      const res = await register({ username, email, password, role });
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-10 px-4">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-14 h-14 bg-[#1db954] rounded-full flex items-center justify-center text-black font-black text-2xl mb-3 shadow-xl shadow-[#1db954]/25">
          ♫
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          {mode === 'login' ? 'Log in to Spotify Clone' : 'Sign up to start listening'}
        </h1>
      </div>

      <div className="w-full max-w-md bg-[#181818] p-8 rounded-2xl border border-[#282828] shadow-2xl">
        {/* Toggle Mode Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#121212] rounded-xl mb-6 border border-[#262626]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              mode === 'login' ? 'bg-[#252525] text-white shadow' : 'text-[#888] hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              mode === 'register' ? 'bg-[#252525] text-white shadow' : 'text-[#888] hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-800 text-red-200 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Role selector on Register */}
          {mode === 'register' && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#b3b3b3]">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-bold transition ${
                    role === 'user'
                      ? 'border-[#1db954] bg-[#1a2e20] text-[#1db954]'
                      : 'border-[#333] bg-[#121212] text-[#888] hover:text-white'
                  }`}
                >
                  <Headphones size={16} />
                  <span>Listener</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('artist')}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-bold transition ${
                    role === 'artist'
                      ? 'border-[#1db954] bg-[#1a2e20] text-[#1db954]'
                      : 'border-[#333] bg-[#121212] text-[#888] hover:text-white'
                  }`}
                >
                  <Mic2 size={16} />
                  <span>Artist / Creator</span>
                </button>
              </div>
            </div>
          )}

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#b3b3b3]">
              {mode === 'login' ? 'Username or Email' : 'Username'}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={mode === 'login' ? 'e.g. johndoe' : 'Choose a username'}
              className="w-full px-4 py-3 bg-[#121212] border border-[#333] rounded-lg text-white text-sm focus:border-[#1db954] focus:outline-none transition"
              required
            />
          </div>

          {/* Email (only on Register) */}
          {mode === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#b3b3b3]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-4 py-3 bg-[#121212] border border-[#333] rounded-lg text-white text-sm focus:border-[#1db954] focus:outline-none transition"
                required
              />
            </div>
          )}

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#b3b3b3]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#121212] border border-[#333] rounded-lg text-white text-sm focus:border-[#1db954] focus:outline-none transition"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-[#1db954] hover:bg-[#1ed760] disabled:bg-[#1db954]/50 text-black font-bold text-sm rounded-full transition shadow-lg flex items-center justify-center transform active:scale-98"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : mode === 'login' ? (
              'Log In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

