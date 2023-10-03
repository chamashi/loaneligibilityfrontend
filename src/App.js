import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoanForm from './pages/LoanForm';
import CustomerRegistration from './pages/CustomerRegistration';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<CustomerRegistration />} />
          <Route exact path="/loanform" element={<LoanForm />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
