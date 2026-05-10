import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionsByHost } from "../../api/sessionsApi";
import SessionCard from "../../components/SessionCard";
import "./HostDashboard.css";

const HostDashboard = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const host = JSON.parse(localStorage.getItem("host") || "{}");

        if (!host.id) {
          navigate("/host/login");
          return;
        }

        const data = await getSessionsByHost(host.id);

        setSessions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, [navigate]);

  const totalSessions = sessions.length;

  const liveSessions = sessions.filter((session) => session.is_active).length;

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div>
          <p className="dashboard-subtitle">Host Panel</p>

          <h1 className="dashboard-title">Your Voting Sessions</h1>
        </div>

        <button
          className="create-session-btn"
          onClick={() => navigate("/host/create")}
        >
          + Create Session
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>{totalSessions}</h2>
          <p>Total Sessions</p>
        </div>

        <div className="stat-card">
          <h2>{liveSessions}</h2>
          <p>Live Sessions</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Total Votes</p>
        </div>
      </div>

      <div className="sessions-grid">
        {loading ? (
          <p>Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p>No sessions created yet.</p>
        ) : (
          sessions.map((session) => (
            <SessionCard
              key={session.id}
              id={session.id}
              title={session.title}
              status={session.is_active ? "LIVE" : "ENDED"}
              participants="0 participants"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HostDashboard;
