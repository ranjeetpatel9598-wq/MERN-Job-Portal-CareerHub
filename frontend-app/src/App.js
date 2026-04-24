import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [listingData, setListingData] = useState([]);
  const [inputState, setInputState] = useState({ title: '', company: '', location: '', salary: '', description: '' });

  const loadPortalData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setListingData(response.data);
    } catch (err) { console.error("Data Load Error:", err); }
  };

  useEffect(() => { loadPortalData(); }, []);

  const handlePostAction = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', inputState);
      setInputState({ title: '', company: '', location: '', salary: '', description: '' });
      loadPortalData();
      alert("Success: Vacancy Published!");
      setActiveTab('all-entries');
    } catch (err) { alert("Processing Error!"); }
  };

  const removeEntry = async (id) => {
    if (window.confirm("Do you want to remove this record?")) {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      loadPortalData();
    }
  };

  if (activeTab === 'home') {
    return (
      <div className="landing-container">
        <nav className="top-navigation">
          <div className="nav-wrapper">
            <div className="brand-identity">
              <div className="brand-logo">🔍</div>
              <div>
                <span className="brand-name">Job Portal</span>
                <p className="brand-tagline">Step into your future</p>
              </div>
            </div>
            <div className="center-menu">
              <span>Home</span><span>Browse Jobs</span><span>pages</span><span>Blog</span><span>Contact</span>
            </div>
            <div className="right-auth">
              <button className="btn-employer-access" onClick={() => setActiveTab('admin-panel')}>Post A Job</button>
            </div>
          </div>
        </nav>

        <header className="main-hero">
          <div className="hero-flex">
            <div className="hero-main-text">
              <span className="live-stats">Over 1,200+ Openings</span>
              <h1>Find Your Dream Job Today</h1>
              <p>Connect with top companies and find the role that fits your passion and skills perfectly.</p>
              <button className="btn-get-started">Upload Your Resume</button>
            </div>
            <div className="hero-vector">
              <img src="https://img.freepik.com/free-vector/job-search-concept-with-man-with-magnifying-glass_23-2148030221.jpg" alt="illustration" />
            </div>
          </div>
        </header>

        <div className="search-widget">
          <div className="widget-box">
            <input type="text" placeholder="Designation, Skills..." />
            <select><option>Select City</option></select>
            <select><option>Job Type</option></select>
            <button className="btn-execute-search">Search Jobs</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="left-panel">
        <div className="panel-header">ADMIN CONSOLE</div>
        <ul className="panel-menu">
          <li className={activeTab === 'admin-panel' ? 'active' : ''} onClick={() => setActiveTab('admin-panel')}> Overview</li>
          <li className={activeTab === 'all-entries' ? 'active' : ''} onClick={() => setActiveTab('all-entries')}> Manage Jobs</li>
          <li onClick={() => setActiveTab('home')}> View Site</li>
        </ul>
      </aside>
      <main className="right-panel-content">
        <header className="content-header">
          <h2>{activeTab === 'admin-panel' ? 'Recruitment Manager' : 'Database Records'}</h2>
          <div className="admin-info">Ranjeet - System Admin </div>
        </header>

        {activeTab === 'admin-panel' ? (
          <div className="ui-card submission-form">
            <h3>Register New Posting</h3>
            <form onSubmit={handlePostAction} className="custom-form">
              <input type="text" placeholder="Position Title" value={inputState.title} onChange={(e) => setInputState({ ...inputState, title: e.target.value })} required />
              <input type="text" placeholder="Hiring Entity" value={inputState.company} onChange={(e) => setInputState({ ...inputState, company: e.target.value })} required />
              <input type="text" placeholder="Work Location" value={inputState.location} onChange={(e) => setInputState({ ...inputState, location: e.target.value })} />
              <input type="text" placeholder="CTC / Package" value={inputState.salary} onChange={(e) => setInputState({ ...inputState, salary: e.target.value })} />
              <textarea placeholder="Candidate Requirements" value={inputState.description} onChange={(e) => setInputState({ ...inputState, description: e.target.value })} />
              <button type="submit" className="btn-submit-form">Add to Database</button>
            </form>
          </div>
        ) : (
          <div className="ui-card data-list">
            {listingData.map(item => (
              <div key={item._id} className="data-row">
                <div className="entry-details"><strong>{item.title}</strong><p>{item.company} | {item.location}</p></div>
                <div className="salary-pill">{item.salary}</div>
                <button onClick={() => removeEntry(item._id)} className="btn-action-delete">Delete</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;