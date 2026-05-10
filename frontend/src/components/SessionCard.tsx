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
      <div className={`session-status ${status.toLowerCase()}`}>{status}</div>

      <h3>{title}</h3>

      <p>{participants}</p>

      <button onClick={() => navigate(`/host/session/${id}`)}>
        Manage Session
      </button>
    </div>
  );
};

export default SessionCard;
