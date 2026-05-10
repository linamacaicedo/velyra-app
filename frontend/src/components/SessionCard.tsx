import "./SessionCard.css";

interface SessionCardProps {
  title: string;
  status: string;
  participants: string;
}

const SessionCard = ({ title, status, participants }: SessionCardProps) => {
  return (
    <div className="session-card">
      <div className="session-top">
        <span
          className={`session-status ${
            status === "LIVE" ? "live" : status === "ENDED" ? "ended" : "draft"
          }`}
        >
          {status}
        </span>
      </div>

      <h2 className="session-title">{title}</h2>

      <p className="session-participants">{participants}</p>

      <button className="session-button">Manage Session</button>
    </div>
  );
};

export default SessionCard;
