import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      {/* NAVBAR */}
      <nav className="home-navbar">
        <h1 className="home-logo">VELYRA</h1>

        <div className="home-nav-actions">
          <Link to="/login" className="home-login">
            Login
          </Link>

          <Link to="/register" className="home-start-btn">
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="home-hero">
        {/* LEFT */}
        <div className="home-left">
          <span className="home-badge">Real-time audience interaction</span>

          <h1 className="home-title">
            Create live polls and engage your audience instantly
          </h1>

          <p className="home-description">
            Velyra Vote helps hosts create interactive voting sessions with
            real-time results for events, classrooms and live experiences.
          </p>

          <div className="home-buttons">
            <Link to="/host/register" className="home-primary-btn">
              Start Hosting
            </Link>

            <Link to="/join" className="home-secondary-btn">
              Join Session
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="home-right">
          <div className="poll-card">
            <div className="poll-top"></div>

            <div className="poll-box"></div>

            <div className="poll-box"></div>

            <div className="poll-box"></div>

            <div className="poll-button"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
