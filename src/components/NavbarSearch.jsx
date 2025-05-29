import React from "react";
// import YouTube from "../pages/YouTube";
import { Link, useLocation } from "react-router-dom";

// Props: query, handleInputChange
const NavbarSearch = ({ query, handleInputChange }) => {
  const location = useLocation();
  const placeholder = location.pathname === '/pages/youtube' ? 'Search videos...' : 'Search Images...';


  return (
    <nav className="navbar navbar-dark bg-dark fixed-top px-3 mb-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand mb-0 h1">
        Gallery
      </span>
      
      <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2"
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
      </form>

      {/* <Link to="/pages/youtube">
        <button className="btn btn-warning">Streaming</button>
        </Link> */}
      </div>
      
        
    </nav>
  );
};

export default NavbarSearch;
