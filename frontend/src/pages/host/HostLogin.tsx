import { Link } from "react-router-dom";
import "./HostLogin.css";

export default function HostLogin() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>VELYRA</h1>
          <span>Vote System</span>
        </div>

        <form className="login-form">
          <input
            type="email"
            placeholder="Type your email...............Velyra@gmail.com"
          />

          <input type="password" placeholder="Password" />

          <button type="submit">Login</button>

          <p className="register-text">
            Don’t have an account? <Link to="/host/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
