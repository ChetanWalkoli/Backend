import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Upload, Music, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UploadMusic() {
  const { isArtist } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
      if (!title) {
        // Auto-fill title from filename
        setTitle(selected.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an audio file to upload.');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a track title.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('file', file);

    try {
      const res = await API.post('/music/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(
        err.response?.data?.message || 'Failed to upload music to ImageKit. Check backend connection.'
      );
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
          Only registered artists can upload tracks to the studio. Sign in with an artist account or create one.
        </p>
        <button
          onClick={() => navigate('/auth')}
          className="px-6 py-2.5 bg-[#1db954] hover:bg-[#1ed760] text-black font-bold text-sm rounded-full transition"
        >
          Switch Account
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Upload className="text-[#1db954]" size={28} />
          <span>Upload Audio Track</span>
        </h2>
        <p className="text-sm text-[#888] mt-1">
          Upload MP3/audio files directly to ImageKit cloud storage. Your track will instantly become streamable.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-800 text-red-200 rounded-xl text-sm flex items-center gap-3">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-950/40 border border-[#1db954] text-green-200 rounded-xl text-sm flex items-center gap-3">
          <CheckCircle2 size={18} className="text-[#1db954] flex-shrink-0" />
          <span>Track uploaded successfully! Redirecting to home...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-[#181818] p-8 rounded-2xl border border-[#282828] shadow-2xl">
        {/* Track Title */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#b3b3b3]">
            Track Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Starboy (Remix)"
            className="w-full px-4 py-3 bg-[#121212] border border-[#333] rounded-lg text-white text-sm focus:border-[#1db954] focus:outline-none transition"
            required
          />
        </div>

        {/* File Dropzone */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#b3b3b3]">
            Audio File (.mp3, .wav)
          </label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#333] hover:border-[#1db954] rounded-xl p-8 cursor-pointer bg-[#121212] transition group">
            <Music className="text-[#666] group-hover:text-[#1db954] mb-3 transition" size={36} />
            <span className="text-sm font-semibold text-white">
              {fileName || 'Click to browse audio file'}
            </span>
            <span className="text-xs text-[#777] mt-1">
              Supports MP3, WAV, AAC formats
            </span>
            <input
              type="file"
              accept="audio/*,.mp3,.wav"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
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
              <span>Uploading to ImageKit...</span>
            </>
          ) : (
            <>
              <Upload size={18} />
              <span>Publish Track</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

