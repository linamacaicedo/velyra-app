interface ResultsChartProps {
  results: {
    optionText: string;
    votes: number;
  }[];

  totalVotes: number;
}

const ResultsChart = ({ results, totalVotes }: ResultsChartProps) => {
  return (
    <div className="results-chart">
      {results.map((result) => {
        const percentage =
          totalVotes === 0 ? 0 : Math.round((result.votes / totalVotes) * 100);

        return (
          <div className="result-item" key={result.optionText}>
            <div className="result-top">
              <span>{result.optionText}</span>

              <span>
                {result.votes} votes • {percentage}%
              </span>
            </div>

            <div className="bar-background">
              <div
                className="bar-fill"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsChart;
