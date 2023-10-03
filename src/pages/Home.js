import React from 'react';
import { Link } from 'react-router-dom';
import { PresentationChartBarIcon, UserGroupIcon, CashIcon } from '@heroicons/react/solid';
import headerImage from '../assets/loan1.jpg';
import '../css/home.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/" style={{ marginLeft: '10px' }}>
          Lendora
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="btn btn-dark" to="/login" style={{ marginRight: '10px' }}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-dark" to="/register" style={{ marginRight: '10px' }}>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h1>Welcome to Lendora</h1>
              <p>Your Trusted Partner for Loan Eligibility Prediction</p>
              <div className="feature">
                <PresentationChartBarIcon className="feature-icon" />
                <h3>Loan Eligibility</h3>
                <p>Check your eligibility for a loan with our predictive analysis.</p>
              </div>
              <div className="feature">
                <UserGroupIcon className="feature-icon" />
                <h3>Register</h3>
                <p>Create an account to access our loan application and prediction tool.</p>
              </div>
              <div className="feature">
                <CashIcon className="feature-icon" />
                <h3>Apply for Loan</h3>
                <p>Hurry! Submit your first loan application to us!!</p>
              </div>
              <Link to="/login" className="btn btn-primary">
                Get Started
              </Link>
            </div>
            <div className="col-lg-6">
              <img src={headerImage} alt="Header" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
