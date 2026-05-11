import { useEffect, useState } from "react";

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
    }
  };

  useEffect(() => {
    loadResults();

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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveResults;
