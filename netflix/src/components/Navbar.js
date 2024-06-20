import React from 'react';
import '../App.css';

export default function Navbar() {
  return (
    <div className="home-navbar">
      <nav>
        <div className="home_nav">
          <img src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="logo" className="homeNav__logo" />
          <a class="homeNav__link" href="#">Home</a>
          <a class="homeNav__link" href="#">TV Shows</a>
          <a class="homeNav__link" href="#">Movies</a>
          <a class="homeNav__link" href="#">News & Popular</a>
          <a class="homeNav__link" href="#">My Lists</a>
          <a class="homeNav__link" href="#">Browse my Language</a>
          <div className="home_Rightnav">
          <input type="search" class="input-search" placeholder="&#x1F50D;  Type to Search..." />
          <a href="#" class="homeNav__link">Children</a>

          </div>
        </div>
      </nav>
    </div>
  );
}