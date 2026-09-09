import { useContext, useState } from "react";
import axios from "axios";
import { UserProvider } from "../context/UserContext";

function Chatbot() {
  const { userInfo, setUserInfo } = useContext(UserProvider);

  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const question = query.trim();

    if (!question) {
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const result = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: question
                }
              ]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": "AQ.Ab8RN6Jmirsf9T0CIZGtNB0r8OO2Acoya1aM_6orrJgXzvA8iQ"
          }
        }
      );

      const answer =
        result.data?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text || "")
          .join("") ||
        "No response received.";

      setResponse(answer);

    } catch (error) {
      console.error(
        "Gemini API Error:",
        error.response?.data || error
      );

      const errorMessage =
        error.response?.data?.error?.message ||
        "Gemini API se response nahi aa saka.";

      setResponse(`Error: ${errorMessage}`);

    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserInfo(null);
  };

  return (
    <main className="page chatbot-page">

      <section className="card chatbot-card">

        <div className="topbar">

          <div>
            <h1>AI Chatbot</h1>

            <p className="muted">
              Welcome, {userInfo?.name}
            </p>
          </div>

          <button
            type="button"
            className="logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        <div className="response-box">

          {loading ? (
            <p>AI is thinking...</p>
          ) : response ? (
            <p>{response}</p>
          ) : (
            <p className="muted">
              Ask an AI-related question below.
            </p>
          )}

        </div>

        <form onSubmit={handleSubmit}>

          <label htmlFor="query">
            Query
          </label>

          <input
            id="query"
            type="text"
            placeholder="Ask an AI-related question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </form>

      </section>

    </main>
  );
}

export default Chatbot;