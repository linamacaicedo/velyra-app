import { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { getSessionResults } from "../../api/sessionsApi";

function LiveResults() {
  const { sessionId } = useParams();

  const [results, setResults] = useState<any[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadResults = async () => {
    try {
      if (!sessionId) return;

      const data = await getSessionResults(sessionId);

      setResults(data.results);
      setTotalVotes(data.totalVotes);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
=======

import { useNavigate, useParams } from "react-router-dom";

import { getSessionResults } from "../../api/sessionsApi";

import { supabase } from "../../services/supabase";

import "./LiveResults.css";

const LiveResults = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [results, setResults] = useState<any[]>([]);

  const [totalVotes, setTotalVotes] = useState(0);

  const loadResults = async () => {
    try {
      if (!id) return;

      const data = await getSessionResults(id);

      setResults(data.results);

      setTotalVotes(data.totalVotes);
    } catch (error) {
      console.error(error);
>>>>>>> f4b8cd848ff0b4ec69fc47bde8fc22ab2998c90a
    }
  };

  useEffect(() => {
    loadResults();

<<<<<<< HEAD
    const interval = setInterval(() => {
      loadResults();
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionId]);

  if (loading) {
    return <div>Loading results...</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F172A",
        color: "white",
        padding: "40px"
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "8px" }}>
        Live Results
      </h1>

      <p style={{ color: "#CBD5E1", marginBottom: "32px" }}>
        Total votes: {totalVotes}
      </p>

      {error && <p style={{ color: "#F87171" }}>{error}</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {results.map((result) => {
          const percentage =
            totalVotes === 0 ? 0 : Math.round((result.votes / totalVotes) * 100);

          return (
            <div
              key={result.optionId}
              style={{
                background: "#1E293B",
                padding: "20px",
                borderRadius: "18px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px"
                }}
              >
                <strong>{result.optionText}</strong>
                <span>
                  {result.votes} votes · {percentage}%
                </span>
              </div>

              <div
                style={{
                  height: "12px",
                  background: "#334155",
                  borderRadius: "999px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #0033FF, #977DFF)",
                    borderRadius: "999px"
                  }}
                />
              </div>
=======
    const channel = supabase
      .channel("live-results")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "votes",
        },
        () => {
          loadResults();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  return (
    <div className="live-results-page">
      <button className="results-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="results-header">
        <p>LIVE RESULTS</p>

        <h1>Audience Voting</h1>

        <span>{totalVotes} votes received</span>
      </div>

      <div className="results-container">
        {results.map((result) => {
          const percentage =
            totalVotes > 0 ? Math.round((result.votes / totalVotes) * 100) : 0;

          return (
            <div className="result-card" key={result.optionId}>
              <div className="result-top">
                <h2>{result.optionText}</h2>

                <span>{percentage}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <p>{result.votes} votes</p>
>>>>>>> f4b8cd848ff0b4ec69fc47bde8fc22ab2998c90a
            </div>
          );
        })}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
};
>>>>>>> f4b8cd848ff0b4ec69fc47bde8fc22ab2998c90a

export default LiveResults;