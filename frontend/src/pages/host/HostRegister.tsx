import { Link } from "react-router-dom";
import "./HostRegister.css";

export default function HostRegister() {
  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1>VELYRA</h1>
          <span>Vote System</span>
        </div>

        <h2>Create account...</h2>

        <form className="register-form">
          <div className="name-row">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>

          <input
            type="email"
            placeholder="Type your email...............Velyra@gmail.com"
          />

          <input type="password" placeholder="Password" />

          <label className="terms">
            <input type="checkbox" />
            <span>Agree to all terms and conditions</span>
          </label>

          <button type="submit">Create account</button>

          <p className="login-text">
            Already have an account? <Link to="/host/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
