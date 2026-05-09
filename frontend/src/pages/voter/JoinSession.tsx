import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionByCode } from "../../api/sessionsApi";

function JoinSession() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleJoinSession = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSessionByCode(code);

      navigate("/vote", {
        state: {
          session: data.session,
          options: data.options
        }
      });
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(180deg, #F5F2FF 0%, #D8B4FE 100%)"
      }}
    >
      <div
        style={{
          width: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#4338CA",
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "20px"
          }}
        >
          VELYRA
        </h1>

        <input
          type="text"
          placeholder="Enter voting code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          style={{
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            fontSize: "18px",
            textAlign: "center"
          }}
        />

        <button
          onClick={handleJoinSession}
          disabled={loading}
          style={{
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#5B4CF0",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Loading..." : "Continue"}
        </button>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center"
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default JoinSession;