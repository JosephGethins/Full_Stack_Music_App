import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="Navbar">  {/* Corrected className */}
      <ul>
        <li>
          <Link to="/">Home</Link> {/* Link to the Home page */}
        </li>
        <li>
          <Link to="/artists">Artists</Link>
        </li>
        <li>
          <Link to="/albums">Albums</Link>
        </li>
        <li>
          <Link to="/songs">Songs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
