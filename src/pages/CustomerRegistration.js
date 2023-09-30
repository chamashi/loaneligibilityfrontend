import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/register.css';

function CustomerRegistration() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Add a class to the body element when the component mounts
  useEffect(() => {
    document.body.classList.add('register-page-bg');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('register-page-bg');
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      const response = await axios.post('http://localhost:8080/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Registration successful!');
        setError('');
      } else {
        setError('Error: ' + response.statusText);
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div>
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
              <Link className="btn btn-dark" to="/" style={{ marginRight: '10px' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-dark" to="/register" style={{ marginRight: '10px' }}>
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-dark" to="/login" style={{ marginRight: '10px' }}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
              required
              placeholder="Enter your Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
              required
              placeholder="Enter your Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password" placeholder="Password should be 6 characters long"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
              required
              maxLength={6}
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-control"
              required
              maxLength={6}
              placeholder="Confirm your password"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>

        {successMessage && (
          <div className="alert alert-success mt-3">
            <p>{successMessage}</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-3">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerRegistration;
