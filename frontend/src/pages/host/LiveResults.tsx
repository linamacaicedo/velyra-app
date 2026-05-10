import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getSessionResults } from "../../api/sessionsApi";

import ResultsChart from "../../components/ResultsChart";

import "./LiveResults.css";

const LiveResults = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [results, setResults] = useState<any[]>([]);

  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
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

    loadResults();

    const interval = setInterval(loadResults, 2000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="live-results-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="results-card">
        <div className="results-header">
          <p>Live Results</p>

          <h1>Total Votes: {totalVotes}</h1>
        </div>

        <ResultsChart results={results} totalVotes={totalVotes} />
      </div>
    </div>
  );
};

export default LiveResults;
