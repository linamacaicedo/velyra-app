import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginHost } from "../../api/authApi";
import "./HostLogin.css";

export default function HostLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginHost(email, password);

      localStorage.setItem("host", JSON.stringify(data.host));

      navigate("/host/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <div className="login-brand">
            <h1>VELYRA</h1>
            <p>Host Portal</p>
          </div>

          <div className="login-content">
            <span className="login-badge">Real-time audience interaction</span>

            <h2>
              Welcome
              <br />
              back host
            </h2>

            <p>
              Login to manage your live sessions, create polls and view audience
              results instantly.
            </p>
          </div>
        </div>

        <div className="login-right">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-header">
              <h3>Login</h3>
              <p>Access your Velyra dashboard</p>
            </div>

            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="velyra@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

            <p className="register-text">
              Don’t have an account?
              <Link to="/host/register"> Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
