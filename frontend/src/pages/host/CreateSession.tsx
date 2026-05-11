import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createSession } from "../../api/sessionsApi";

import "./CreateSession.css";

const CreateSession = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [question, setQuestion] = useState("");

  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];

    updatedOptions[index] = value;

    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const host = JSON.parse(localStorage.getItem("host") || "{}");

      const filteredOptions = options.filter((option) => option.trim() !== "");

      const data = await createSession(
        host.id,
        title,
        question,
        filteredOptions,
      );

      navigate(`/host/session/${data.session.id}`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="create-session-page">
      <div className="create-session-card">
        <button
          className="back-button"
          onClick={() => navigate("/host/dashboard")}
        >
          ← Dashboard
        </button>

        <div className="create-header">
          <p>Create a new live poll</p>

          <h1>Create Session</h1>
        </div>

        <form className="create-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Session Title</label>

            <input
              type="text"
              placeholder="Title of your poll"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Question</label>

            <input
              type="text"
              placeholder="Poll question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className="options-wrapper">
            <label>Options</label>

            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            ))}
          </div>

          <button type="button" className="add-option-btn" onClick={addOption}>
            + Add Option
          </button>

          <button type="submit" className="submit-session-btn">
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;
