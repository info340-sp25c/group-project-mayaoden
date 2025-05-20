import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
      <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="mb-3 text-center">Create Account</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Create Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirm-password" />
            </div>
            <button type="submit" className="btn btn-success w-100">Sign Up</button>
            <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}

export default SignUp;
