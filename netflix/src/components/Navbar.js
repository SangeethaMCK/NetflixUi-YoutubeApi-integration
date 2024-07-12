import React, { useEffect, useState } from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCaretDown,
  faCaretUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [icon, setIcon] = useState(faCaretDown);
  const navItems = [
    "Home",
    "TV Shows",
    "Movies",
    "News & Popular",
    "My Lists",
    "Browse by Language",
  ];

  function handleScroll() {
    const navBar = document.querySelector(".home_nav");
    if (window.scrollY > 0) {
      navBar.style.background =
        "linear-gradient(to bottom, rgba(0,0,0,1), rgba(22,22,22, 1)";
    } else {
      navBar.style.background =
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))";
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleMouseOver() {
    setIcon(faCaretUp);
  }

  function handleMouseOut() {
    setIcon(faCaretDown);
  }

  return (
    <nav className="home-navbar">
      <div className="home_nav">
        <img
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt="logo"
          className="homeNav__logo"
        />
        {navItems.map((item, index) => (
          <a key={index} className="homeNav__link" href="#">
            {item}
          </a>
        ))}
        <div className="home_Rightnav">
          <input
            type="search"
            className="input-search"
            placeholder="&#x1F50D; Titles, people, genres"
          />
          <a href="#" className="homeNav__link">
            Children
          </a>
          <FontAwesomeIcon
            icon={faBell}
            className="homeNav__link"
            id="notifications"
          />
          <FontAwesomeIcon
            icon={faUser}
            className="homeNav__link"
            id="user"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
          <FontAwesomeIcon
            icon={icon}
            className="homeNav__link"
            id="caretDown"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        </div>
      </div>
    </nav>
  );
}
