import React from 'react';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <span className="search-icon">🔍</span> Job Board
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/browse">Browse Job</a></li>
          <li><a href="/pages">Pages</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="nav-actions">
          <button className="login-btn">Log in</button>
          <button className="post-job-btn">Post A Job</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <p className="job-count">4536+ Jobs listed</p>
          <h1>Find your Dream Job</h1>
          <p className="subtitle">We provide online instant cash loans with quick approval that suit your term length.</p>
          <button className="upload-btn">Upload Your Resume</button>
        </div>
        
        <div className="hero-image">
          {/* Placeholder for the illustration in the mockup */}
          <div className="illustration-placeholder">
             [Insert SVG Illustration Here]
          </div>
        </div>
      </header>

      {/* Search Bar Component */}
      <div className="search-bar-container">
        <form className="search-form">
          <input type="text" placeholder="Search keyword" />
          <select>
            <option>Location</option>
            <option>New York</option>
            <option>London</option>
          </select>
          <select>
            <option>Category</option>
            <option>Development</option>
            <option>Design</option>
          </select>
          <button type="submit" className="find-job-btn">Find Job</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
