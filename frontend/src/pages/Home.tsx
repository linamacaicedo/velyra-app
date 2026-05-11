import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      {/* NAVBAR */}
      <nav className="home-navbar">
        <h1 className="home-logo">VELYRA</h1>

        <div className="home-nav-actions">
          <Link to="/host/login" className="home-login">
            Login
          </Link>

          <Link to="/host/register" className="home-start-btn">
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

            <Link to="/vote" className="home-secondary-btn">
              Join Session
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="home-right">
          <div className="poll-card">
            <div className="live-badge">
              <span className="live-dot"></span>
              LIVE POLL
            </div>

            <h2 className="poll-question">Which feature do you want next?</h2>

            <div className="poll-option">
              <div className="poll-option-top">
                <span>Realtime Charts</span>
                <span>64%</span>
              </div>

              <div className="poll-progress">
                <div
                  className="poll-progress-fill"
                  style={{ width: "64%" }}
                ></div>
              </div>
            </div>

            <div className="poll-option">
              <div className="poll-option-top">
                <span>QR Voting</span>
                <span>23%</span>
              </div>

              <div className="poll-progress">
                <div
                  className="poll-progress-fill second"
                  style={{ width: "23%" }}
                ></div>
              </div>
            </div>

            <div className="poll-option">
              <div className="poll-option-top">
                <span>Dark Mode</span>
                <span>13%</span>
              </div>

              <div className="poll-progress">
                <div
                  className="poll-progress-fill third"
                  style={{ width: "13%" }}
                ></div>
              </div>
            </div>

            <div className="poll-footer">
              <p>2,451 votes submitted</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
