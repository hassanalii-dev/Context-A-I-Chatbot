import { useContext, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { UserProvider } from "../context/UserContext";
import "./Chatbot.css";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

function Chatbot() {
  const { userInfo, setUserInfo } = useContext(UserProvider);

  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim() || loading) {
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: query.trim(),
        config: {
          systemInstruction: `
You are a Starbucks AI Assistant.

You can only answer questions about these topics:
1. Menu
2. Coffee
3. Prices
4. Orders
5. Store locations

Starbucks offers:
Coffee, Frappuccino, Tea, Refreshers, Sandwiches, and Bakery items.

If the user asks about coffee, recommend a suitable Starbucks drink.
If the user asks about the menu, briefly describe menu items.
If the user asks about prices, explain that prices vary by location.
If the user asks about orders, explain how to place or check an order.
If the user asks about store locations, guide them to the official Starbucks website.

If the question is unrelated to Starbucks, reply:
Sorry, I can only help with Starbucks menu, coffee, prices, orders and store locations.

Keep every response short, friendly, simple, and polite.
Do not use asterisks or hashtags.
          `,
        },
      });

      setResponse(
        result.text || "Sorry, no response was received. Please try again."
      );
    } catch (err) {
      console.error("Gemini API Error:", err);

      if (err.message?.includes("403")) {
        setResponse(
          "Access denied. Please check your Google AI Studio project, API key, and model access."
        );
      } else if (err.message?.includes("429")) {
        setResponse(
          "The API request limit has been reached. Please try again later."
        );
      } else {
        setResponse(
          err.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserInfo(null);
  };

  return (
    <main className="chatbot-page">
      <section className="card chatbot-card">
        <div className="topbar">
          <div className="chatbot-heading">
            <h1>Starbucks AI</h1>

            <p className="muted">
              Welcome, {userInfo?.name || "Guest"}
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

        <div className="response-box" aria-live="polite">
          {loading ? (
            <p>Starbucks AI is thinking...</p>
          ) : response ? (
            <p>{response}</p>
          ) : (
            <p className="muted">
              Ask about menu, coffee, prices, orders or locations.
            </p>
          )}
        </div>

        <form className="chatbot-form" onSubmit={handleSubmit}>
          <label htmlFor="query">Query</label>

          <input
            type="text"
            name="query"
            id="query"
            placeholder="Ask about coffee, menu, prices..."
            value={query}
            onChange={handleChange}
            disabled={loading}
          />

          <button type="submit" disabled={loading || !query.trim()}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Chatbot;