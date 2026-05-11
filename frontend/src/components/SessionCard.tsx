import { useNavigate } from "react-router-dom";
import "./SessionCard.css";

interface SessionCardProps {
  id: string;
  title: string;
  status: string;
  participants: string;
}

const SessionCard = ({ id, title, status, participants }: SessionCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="session-card">
      <div className="session-top">
        <div className={`session-status ${status.toLowerCase()}`}>{status}</div>
      </div>

      <div className="session-content">
        <h3 className="session-title">{title}</h3>

        <p className="session-participants">{participants}</p>
      </div>

      <button
        className="session-button"
        onClick={() => navigate(`/host/session/${id}`)}
      >
        Manage Session
      </button>
    </div>
  );
};

export default SessionCard;
