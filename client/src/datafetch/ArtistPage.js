import React, { useState, useEffect } from "react";
import axios from "axios";

const ArtistPage = () => {
  const [artists, setArtists] = useState([]);
  const [name, setName] = useState("");
  const [monthlyListeners, setMonthlyListeners] = useState("");
  const [genre, setGenre] = useState("");

  // Fetch all artists when the component mounts
  useEffect(() => {
    fetchArtists();
  }, []);

  // Function to fetch all artists from the database
  const fetchArtists = async () => {
    const res = await axios.get("http://localhost:5000/artists");
    setArtists(res.data);
  };

  // Function to add a new artist to the database
  const addArtist = async () => {
    if (!name.trim() || !monthlyListeners || !genre.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const newArtist = {
      name: name,
      monthly_listeners: monthlyListeners,
      genre: genre,
    };

    try {
      await axios.post("http://localhost:5000/artists", newArtist);
      setName("");
      setMonthlyListeners("");
      setGenre("");
      fetchArtists(); // Refresh the list of artists after adding a new one
    } catch (error) {
      console.error("Error adding artist:", error);
      alert("Error adding artist");
    }
  };

  // Function to update an existing artist
  const updateArtist = async (id) => {
    // Use the 'artists' state array to find the artist record
    const artistToUpdate = artists.find((artist) => artist.id === id);
    if (!artistToUpdate) return;
  
    // Prompt for new values (pre-filled with current values)
    const newName = prompt("Enter new artist name:", artistToUpdate.name);
    const newMonthlyListeners = prompt(
      "Enter new monthly listeners:",
      artistToUpdate.monthly_listeners
    );
    const newGenre = prompt("Enter new genre:", artistToUpdate.genre);
  
    // Validate inputs
    if (!newName || !newMonthlyListeners || !newGenre) {
      alert("All fields are required!");
      return;
    }
  
    // Parse the monthly listeners as a number
    const parsedMonthlyListeners = parseInt(newMonthlyListeners, 10);
    if (isNaN(parsedMonthlyListeners)) {
      alert("Monthly listeners must be a number!");
      return;
    }
  
    // Create the updated artist object
    const updatedArtist = {
      name: newName,
      monthlyListeners: parsedMonthlyListeners, // using camelCase for client
      genre: newGenre,
    };
  
    try {
      // Use the artist's id directly in the URL
      await axios.put(`http://localhost:5000/artists/${id}`, updatedArtist);
      fetchArtists(); // Refresh the list after update
    } catch (error) {
      console.error("Error updating artist:", error);
      alert("Error updating artist. Check the console for details.");
    }
  };
  

  // Function to delete an artist
  const deleteArtist = async (id) => {
    await axios.delete(`http://localhost:5000/artists/${id}`);
    fetchArtists();
  };

  return (
    <div>
      <main>
      <h2>Artists</h2>
      <input
        type="text"
        placeholder="Artist Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Monthly Listeners"
        value={monthlyListeners}
        onChange={(e) => setMonthlyListeners(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button onClick={addArtist}>Add Artist</button>

      <h3>All Artists</h3>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name} - {artist.monthly_listeners} listeners - {artist.genre}
            <button onClick={() => updateArtist(artist.id)}>
              Update
            </button>
            <button onClick={() => deleteArtist(artist.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </main>
    </div>
  );
};

export default ArtistPage;
