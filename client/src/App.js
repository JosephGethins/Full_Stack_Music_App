import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './datafetch/Home';
import ArtistPage from './datafetch/ArtistPage';
import AlbumPage from './datafetch/AlbumPage';
import SongPage from './datafetch/SongPage';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<ArtistPage />} />
        <Route path="/albums" element={<AlbumPage />} />
        <Route path="/songs" element={<SongPage />} />
      </Routes>
    </Router>
  );
}

export default App;
