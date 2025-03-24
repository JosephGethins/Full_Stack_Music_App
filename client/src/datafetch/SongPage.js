import React, { useState, useEffect } from "react";
import axios from "axios";

const SongPage = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]); // Store the list of albums
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(""); // Store selected album_id

  useEffect(() => {
    fetchSongs();
    fetchAlbums(); // Fetch albums for the dropdown
  }, []);

  // Fetch all songs
  const fetchSongs = async () => {
    const res = await axios.get("http://localhost:5000/songs");
    setSongs(res.data);
  };

  // Fetch all albums for dropdown
  const fetchAlbums = async () => {
    const res = await axios.get("http://localhost:5000/albums");
    setAlbums(res.data);
  };

  // Add new song
  const addSong = async () => {
    if (!name.trim() || !releaseYear || !selectedAlbum) {
      alert("Please fill all fields!");
      return;
    }

    const newSong = {
      name,
      release_year: releaseYear,
      album_id: selectedAlbum,
    };

    try {
      await axios.post("http://localhost:5000/songs", newSong);
      setName("");
      setReleaseYear("");
      setSelectedAlbum("");
      fetchSongs(); // Refresh the list of songs after adding a new one
    } catch (error) {
      console.error("Error adding song:", error);
      alert("Error adding song");
    }
  };

  // Update a song
  const updateSong = async (id) => {
    const songToUpdate = songs.find((song) => song.id === id);
    if (!songToUpdate) return;

    const newName = prompt("Enter new song name:", songToUpdate.name);
    const newReleaseYear = prompt("Enter new release year:", songToUpdate.release_year);

    if (!newName || !newReleaseYear) {
      alert("All fields are required!");
      return;
    }

    const parsedReleaseYear = parseInt(newReleaseYear, 10);

    if (isNaN(parsedReleaseYear)) {
      alert("Release year must be a number!");
      return;
    }

    const updatedSong = {
      name: newName,
      release_year: parsedReleaseYear,
      album_id: songToUpdate.album_id, // Preserve album_id
    };

    try {
      await axios.put(`http://localhost:5000/songs/${id}`, updatedSong);
      fetchSongs();
    } catch (error) {
      console.error("Error updating song:", error);
      alert("Error updating song. Check the console for details.");
    }
  };

  // Delete a song
  const deleteSong = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this song?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/songs/${id}`);
      fetchSongs(); // Refresh the list of songs
    } catch (error) {
      console.error("Error deleting song:", error);
      alert("Error deleting song");
    }
  };

    return (
      <div className="song-container">
        <h2>Songs</h2>
        <div className="form-container">
          <input
            type="text"
            placeholder="Song Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Release Year"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
    
          {/* Dropdown to Select Album */}
          <select value={selectedAlbum} onChange={(e) => setSelectedAlbum(e.target.value)}>
            <option value="">Select Album</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.name}
              </option>
            ))}
          </select>
    
          <button onClick={addSong}>Add Song</button>
        </div>
    
        <h3>All Songs</h3>
        <ul className="song-list">
          {songs.map((song) => (
            <li key={song.id}>
              {song.name} - {song.release_year} - Album ID: {song.album_id}
              <button onClick={() => updateSong(song.id)}>Update</button>
              <button onClick={() => deleteSong(song.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
    
};

export default SongPage;