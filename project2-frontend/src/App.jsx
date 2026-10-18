import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PlayerBar from './components/PlayerBar';

import Home from './pages/Home';
import Albums from './pages/Albums';
import AlbumDetails from './pages/AlbumDetails';
import UploadMusic from './pages/UploadMusic';
import CreateAlbum from './pages/CreateAlbum';
import Auth from './pages/Auth';

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <div className="flex h-screen w-screen overflow-hidden bg-[#000000] text-white">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#121212]">
              <Navbar />

              <main className="flex-1 overflow-y-auto px-8 py-6 pb-32">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/albums" element={<Albums />} />
                  <Route path="/album/:albumId" element={<AlbumDetails />} />
                  <Route path="/artist/upload" element={<UploadMusic />} />
                  <Route path="/artist/create-album" element={<CreateAlbum />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>

            {/* Persistent Audio Player */}
            <PlayerBar />
          </div>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
}
