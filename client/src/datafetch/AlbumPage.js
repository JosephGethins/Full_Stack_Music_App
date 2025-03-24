import React, { useState, useEffect } from "react";
import axios from "axios";

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]); // Store the list of artists
  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [numberOfListens, setNumberOfListens] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(""); // Store selected artist_id

  // Fetch all albums and artists when the component mounts
  useEffect(() => {
    fetchAlbums();
    fetchArtists();
  }, []);

  // Fetch all albums
  const fetchAlbums = async () => {
    const res = await axios.get("http://localhost:5000/albums");
    setAlbums(res.data);
  };

  // Fetch all artists for dropdown
  const fetchArtists = async () => {
    const res = await axios.get("http://localhost:5000/artists");
    setArtists(res.data);
  };

  // Add new album
  const addAlbum = async () => {
    if (!name.trim() || !releaseYear || !numberOfListens || !selectedArtist) {
      alert("Please fill all fields!");
      return;
    }

    const newAlbum = {
      name,
      release_year: releaseYear,
      number_of_listens: numberOfListens,
      artist_id: selectedArtist, // Pass the artist_id
    };

    try {
      await axios.post("http://localhost:5000/albums", newAlbum);
      setName("");
      setReleaseYear("");
      setNumberOfListens("");
      setSelectedArtist("");
      fetchAlbums(); // Refresh the list of albums
    } catch (error) {
      console.error("Error adding album:", error);
      alert("Error adding album");
    }
  };

  // Update an album some broken code idk fix later (fixed)
  const updateAlbum = async (id) => {
    const albumToUpdate = albums.find((album) => album.id === id);
    if (!albumToUpdate) return;
  
    // Pre-fill prompts with current values
    const newName = prompt("Enter new album name:", albumToUpdate.name);
    const newReleaseYear = prompt("Enter new release year:", albumToUpdate.release_year);
    const newNumberOfListens = prompt("Enter new number of listens:", albumToUpdate.number_of_listens);
  
    // Validate inputs
    if (!newName || !newReleaseYear || !newNumberOfListens) {
      alert("All fields are required!");
      return;
    }
  
    // Convert to numbers and validate
    const parsedReleaseYear = parseInt(newReleaseYear, 10);
    const parsedNumberOfListens = parseInt(newNumberOfListens, 10);
  
    if (isNaN(parsedReleaseYear) || isNaN(parsedNumberOfListens)) {
      alert("Release year and number of listens must be numbers!");
      return;
    }
  
    // Include artist_id from the existing album
    const updatedAlbum = {
      name: newName,
      release_year: parsedReleaseYear,
      number_of_listens: parsedNumberOfListens,
      artist_id: albumToUpdate.artist_id, // Ensure artist_id is included!!!!!!!!!!!!!
    };
  
    try {
      await axios.put(`http://localhost:5000/albums/${id}`, updatedAlbum);
      fetchAlbums();
    } catch (error) {
      console.error("Error updating album:", error);
      alert("Error updating album. Check the console for details.");
    }
  };

  // Delete an album
  const deleteAlbum = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this album?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/albums/${id}`);
      fetchAlbums(); // Refresh the list of albums
    } catch (error) {
      console.error("Error deleting album:", error);
      alert("Error deleting album");
    }
  };

  return (
    <div className="album-container">
      <h2>Albums</h2>
      <div className="form-container">
        <input type="text" placeholder="Album Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Release Year" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
        <input type="number" placeholder="Number of Listens" value={numberOfListens} onChange={(e) => setNumberOfListens(e.target.value)} />
        <select value={selectedArtist} onChange={(e) => setSelectedArtist(e.target.value)}>
          <option value="">Select Artist</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>{artist.name}</option>
          ))}
        </select>
        <button onClick={addAlbum}>Add Album</button>
      </div>
  
      <h3>All Albums</h3>
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id}>
            {album.name} - {album.release_year} - {album.number_of_listens} listens - Artist ID: {album.artist_id}
            <button onClick={() => updateAlbum(album.id)}>Update</button>
            <button onClick={() => deleteAlbum(album.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default AlbumPage;