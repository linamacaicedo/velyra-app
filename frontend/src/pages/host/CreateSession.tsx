import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSession } from "../../api/sessionsApi";

const CreateSession = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const host = JSON.parse(localStorage.getItem("host") || "{}");

      if (!host.id) {
        navigate("/host/login");
        return;
      }

      await createSession(host.id, title, question, [option1, option2]);

      alert("Session created successfully");

      navigate("/host/dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-logo">Create Session</h1>

        <p className="register-subtitle">Create a new live voting session</p>

        <form className="register-form" onSubmit={handleCreateSession}>
          <input
            type="text"
            placeholder="Session Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Option 1"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Option 2"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            required
          />

          <button type="submit">
            {loading ? "Creating session..." : "Create Session"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;
