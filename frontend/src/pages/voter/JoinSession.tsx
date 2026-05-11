import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSessionByCode } from "../../api/sessionsApi";

import "./JoinSession.css";

function JoinSession() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleJoinSession = async () => {
    try {
      setLoading(true);

      setError("");

      if (!code.trim()) {
        setError("Please enter a session code");
        return;
      }

      const data = await getSessionByCode(code);

      navigate(`/vote/session/${data.session.code}`, {
        state: {
          session: data.session,
          options: data.options,
        },
      });
    } catch (error: any) {
      setError(error.message || "Session not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-page">
      <div className="join-card">
        <div className="join-logo">VELYRA</div>

        <h1>Join a Live Session</h1>

        <p className="join-subtitle">
          Enter the code shared by the host or scan the QR code.
        </p>

        <input
          type="text"
          placeholder="Enter session code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="join-input"
        />

        <button
          onClick={handleJoinSession}
          disabled={loading}
          className="join-button"
        >
          {loading ? "Joining..." : "Join Session"}
        </button>

        <div className="join-divider">
          <span>OR</span>
        </div>

        <div className="qr-info-box">
          <h3>Scan QR Code</h3>

          <p>
            Ask the host to display the session QR code and scan it with your
            phone camera.
          </p>
        </div>

        {error && <p className="join-error">{error}</p>}
      </div>
    </div>
  );
}

export default JoinSession;
