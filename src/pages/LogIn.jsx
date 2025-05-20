import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LogIn() {
  return (
    <>
      <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Log In</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" required />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit" className="btn btn-success w-100">Log In</button>
          </form>
          <p className="mt-3 text-center small">
            Don't have an account? <a href="./signup.html">Sign up</a>
          </p>
        </div>
      </main>
    </>
  );
}

export default LogIn;