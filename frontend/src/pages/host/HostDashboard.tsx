import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getSessionsByHost, getDashboardStats } from "../../api/sessionsApi";

import SessionCard from "../../components/SessionCard";

import "./HostDashboard.css";

const HostDashboard = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<any[]>([]);

  const [stats, setStats] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const host = JSON.parse(localStorage.getItem("host") || "{}");

        if (!host.id) {
          navigate("/host/login");

          return;
        }

        const sessionsData = await getSessionsByHost(host.id);

        setSessions(sessionsData);

        const statsData = await getDashboardStats(host.id);

        setStats(statsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

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
          <h2>{stats?.totalSessions || 0}</h2>

          <p>Total Sessions</p>
        </div>

        <div className="stat-card">
          <h2>{stats?.liveSessions || 0}</h2>

          <p>Live Sessions</p>
        </div>

        <div className="stat-card">
          <h2>{stats?.totalVotes || 0}</h2>

          <p>Total Votes</p>
        </div>

        <div className="stat-card">
          <h2>{stats?.topSession?.title || "—"}</h2>

          <p>Most Popular Session</p>
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
              participants={`${stats?.totalVotes || 0} votes`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HostDashboard;
