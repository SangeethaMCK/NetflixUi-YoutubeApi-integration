import React from 'react';
import "./navbar.css"

export default function Navbar() {
  const navItems=[
    "Home","TV Shows","Movies","News & Popular","My Lists","Browse my Language"
  ]
  return (
   
      <nav>
        <div className="home_nav">
          <img src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="logo" className="homeNav__logo" />
         {navItems.map((item,index)=>{
           return <a key={index} className="homeNav__link" href="#">{item}</a>
         })} 
      <div className="home_Rightnav">
         <input type="search" class="input-search" placeholder="&#x1F50D;      Titles, people, geners" />
          <a href="#" class="homeNav__link">Children</a>

          </div>
        </div>
      </nav>
   
  );
}