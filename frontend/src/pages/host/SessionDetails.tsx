import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getSessionById, closeSession } from "../../api/sessionsApi";

import "./SessionDetails.css";

const SessionDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [session, setSession] = useState<any>(null);

  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const loadSession = async () => {
      try {
        if (!id) return;

        const data = await getSessionById(id);

        setSession(data.session);

        setOptions(data.options);
      } catch (error) {
        console.error(error);
      }
    };

    loadSession();
  }, [id]);

  const handleCloseSession = async () => {
    try {
      if (!id) return;

      await closeSession(id);

      setSession({
        ...session,
        is_active: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!session) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="session-details-page">
      <div className="session-details-card">
        <button
          className="back-button"
          onClick={() => navigate("/host/dashboard")}
        >
          ← Dashboard
        </button>

        <div className="session-header">
          <div>
            <p className="session-label">Live Session</p>

            <h1>{session.title}</h1>

            <h2>{session.question}</h2>
          </div>

          <div
            className={
              session.is_active ? "session-status live" : "session-status ended"
            }
          >
            {session.is_active ? "LIVE" : "ENDED"}
          </div>
        </div>

        <div className="session-code-box">
          <p>Session Code</p>

          <h3>{session.code}</h3>
        </div>

        <div className="options-list">
          {options.map((option) => (
            <div className="option-card" key={option.id}>
              {option.text}
            </div>
          ))}
        </div>

        {session.is_active ? (
          <button className="close-session-btn" onClick={handleCloseSession}>
            Close Session
          </button>
        ) : (
          <div className="session-closed-text">Session Closed</div>
        )}

        <button
          className="view-results-btn"
          onClick={() => navigate(`/host/results/${session.id}`)}
        >
          View Live Results
        </button>
      </div>
    </div>
  );
};

export default SessionDetails;
