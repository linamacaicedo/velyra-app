import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createVote } from "../../api/votesApi";

function VotePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { session, options } = location.state || {};

  const [voterName, setVoterName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session || !options) {
    return <div>No session data found</div>;
  }

  const handleVote = async () => {
    try {
      setLoading(true);
      setError("");

      if (!voterName || !selectedOption) {
        setError("Please enter your name and select an option");
        return;
      }

      await createVote(session.id, selectedOption, voterName);

      navigate("/thank-you");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F5F2FF 0%, #D8B4FE 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.12)"
        }}
      >
        <h1 style={{ color: "#4338CA", marginBottom: "8px" }}>
          {session.title}
        </h1>

        <p style={{ color: "#555", marginBottom: "24px" }}>
          {session.question}
        </p>

        <input
          type="text"
          placeholder="Your name"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #DDD",
            marginBottom: "20px",
            fontSize: "16px"
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {options.map((option: any) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              style={{
                padding: "16px",
                borderRadius: "14px",
                border:
                  selectedOption === option.id
                    ? "2px solid #5B4CF0"
                    : "1px solid #DDD",
                backgroundColor:
                  selectedOption === option.id ? "#EEF2FF" : "white",
                color: "#222",
                fontSize: "16px",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              {option.text}
            </button>
          ))}
        </div>

        <button
          onClick={handleVote}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "24px",
            padding: "16px",
            borderRadius: "14px",
            border: "none",
            backgroundColor: "#5B4CF0",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Submitting..." : "Submit Vote"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "16px", textAlign: "center" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default VotePage;