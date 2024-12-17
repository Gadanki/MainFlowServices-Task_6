import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Our App!</h1>
      <p>We are glad to have you on board.</p>
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
};

export default Welcome;
