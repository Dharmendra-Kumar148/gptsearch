import React from "react";

// Props: query, handleInputChange
const NavbarSearch = ({ query, handleInputChange }) => {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top px-3 mb-4">
      {/* navbar-dark: sets text to light color */}
      {/* bg-dark: sets background color to dark */}
      {/* px-3: horizontal padding, mb-4: margin bottom */}
      <span className="navbar-brand mb-0 h1">
        Gallery
      </span>
      <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search images..."
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </nav>
  );
};

export default NavbarSearch;
