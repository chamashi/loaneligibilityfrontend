import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoanForm.css';
import { Link, useNavigate } from 'react-router-dom';

function LoanForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Gender: '',
    Married: '',
    Dependents: '',
    Education: '',
    Self_Employed: '',
    ApplicantIncome: '',
    CoapplicantIncome: '',
    LoanAmount: '',
    Loan_Amount_Term: '',
    Credit_History: '',
    Property_Area: '',
  });

  const [predictionResult, setPredictionResult] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const categoricalMappings = {
    Gender: { Male: 1, Female: 0 },
    Married: { Yes: 1, No: 0 },
    Dependents: { '0': 0, '1': 1, '2': 2, '3+': 3 },
    Education: { Graduate: 1, 'Not Graduate': 0 },
    Self_Employed: { Yes: 1, No: 0 },
    Credit_History: { '1': 1, '0': 0 },
    Property_Area: { Urban: 0, Semiurban: 1, Rural: 2 },
  };

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
      const response = await axios.post('http://localhost:8080/predict', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.result) {
          setPredictionResult(data.result);
          setError('');
        } else {
          setError('Prediction result is empty.');
        }
      } else {
        setError('Error: ' + response.statusText);
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/logout', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Logout successful, show success message and redirect to home page
        setSuccessMessage('Logged out successfully');
        alert('Logged out successfully'); // Display the logout successful alert
        navigate('/');
      } else {
        setError('Error: ' + response.statusText);
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };
  

  // Function to reset the form
  const handleReset = () => {
    setFormData({
      Gender: '',
      Married: '',
      Dependents: '',
      Education: '',
      Self_Employed: '',
      ApplicantIncome: '',
      CoapplicantIncome: '',
      LoanAmount: '',
      Loan_Amount_Term: '',
      Credit_History: '',
      Property_Area: '',
    });
    setPredictionResult('');
    setError('');
  };

  return (
    <section>
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/" style={{ marginLeft: '10px' }}>
          Lendora
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="btn btn-dark" to="/" style={{ marginRight: "10px" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row">
          <div className="col-md-6">
            {/* Gender */}
            <div className="form-groups">
              <label htmlFor="Gender">Gender:</label>
              <select
                id="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select Gender</option>
                {Object.keys(categoricalMappings.Gender).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            {/* Marital Status */}
            <div className="form-groups">
              <label htmlFor="Married">Marital Status:</label>
              <select
                id="Married"
                name="Married"
                value={formData.Married}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select Marital Status</option>
                {Object.keys(categoricalMappings.Married).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* Dependents */}
            <div className="form-groups">
              <label htmlFor="Dependents">Number of Dependents:</label>
              <select
                id="Dependents"
                name="Dependents"
                value={formData.Dependents}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select Number of Dependents</option>
                {Object.keys(categoricalMappings.Dependents).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            {/* Education */}
            <div className="form-groups">
              <label htmlFor="Education">Education:</label>
              <select
                id="Education"
                name="Education"
                value={formData.Education}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select Education</option>
                {Object.keys(categoricalMappings.Education).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* Self Employed */}
            <div className="form-groups">
              <label htmlFor="Self_Employed">Self Employed:</label>
              <select
                id="Self_Employed"
                name="Self_Employed"
                value={formData.Self_Employed}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select Self Employed</option>
                {Object.keys(categoricalMappings.Self_Employed).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            {/* Credit History */}
            <div className="form-groups">
              <label htmlFor="Credit_History">Credit History:</label>
              <select
                id="Credit_History"
                name="Credit_History"
                value={formData.Credit_History}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select Credit History</option>
                {Object.keys(categoricalMappings.Credit_History).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* Applicant Income */}
            <div className="form-groups">
              <label htmlFor="ApplicantIncome">Applicant Income:</label>
              <input
                type="number"
                id="ApplicantIncome"
                name="ApplicantIncome"
                value={formData.ApplicantIncome}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            {/* Co-Applicant Income */}
            <div className="form-groups">
              <label htmlFor="CoapplicantIncome">Co-Applicant Income:</label>
              <input
                type="number"
                id="CoapplicantIncome"
                name="CoapplicantIncome"
                value={formData.CoapplicantIncome}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* Loan Amount */}
            <div className="form-groups">
              <label htmlFor="LoanAmount">Loan Amount:</label>
              <input
                type="number"
                id="LoanAmount"
                name="LoanAmount"
                value={formData.LoanAmount}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            {/* Loan Amount Term */}
            <div className="form-groups">
              <label htmlFor="Loan_Amount_Term">Amount Term (months):</label>
              <input
                type="number"
                id="Loan_Amount_Term"
                name="Loan_Amount_Term"
                value={formData.Loan_Amount_Term}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>

        {/* Property Area */}
        <div className="form-groups">
          <label htmlFor="Property_Area">Property Area:</label>
          <select
            id="Property_Area"
            name="Property_Area"
            value={formData.Property_Area}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="">Select Property Area</option>
            {Object.keys(categoricalMappings.Property_Area).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Submit and Reset Buttons */}
        <div className="form-groups">
          <button type="submit" className="btn btn-primary">
            Predict Loan Eligibility
          </button>
          <button type="button" className="btn btn-secondary reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {predictionResult !== '' && (
        <div className="alert alert-success mt-3">
          <p>Prediction Result: {predictionResult}</p>
        </div>
      )}

      {/* Success Message */}
{successMessage !== '' && (
  <div className="success-message">
    <p>{successMessage}</p>
  </div>
)}

{/* Error Message */}
{error !== '' && (
  <div className="error-message">
    <p>{error}</p>
  </div>
)}

    </section>
  );
}

export default LoanForm;
