import React from 'react';
import '../App.css';
import Home from './Navbar';

export default function Entry() {

  return (
    <div className="entryPage">
      <header>
        <nav className="navBar">
          <img
            src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
            className="nav__logo"
            alt="Netflix Logo"
          />
          <div className="nav__links">
            <div className="dropdown">
              <button className="dropdown__button">
                English
              </button>
              <ul className="dropdown__menu" style={{ listStyleType: 'none' }}>
                <li>
                  <a className="dropdown__item" href="#">
                    English
                  </a>
                </li>
                <li>
                  <a className="dropdown__item" href="#">
                    Hindi
                  </a>
                </li>
              </ul>
            </div>
            <button className="signUp__button">Sign Up</button>
          </div>
        </nav>  
      </header>
      <div className="banner">
        <div className="heading">
          <h1>Unlimited movies, TV shows and more</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <h2>Ready to watch? Enter your email to create or restart your membership.</h2>
        </div>
        <form >
          <input className="email" type="email" placeholder="Email Address" />
          <button className="signUp__btn" type="submit">Get Started {">"}</button>
        </form>
      </div>
    </div>
  );
}
