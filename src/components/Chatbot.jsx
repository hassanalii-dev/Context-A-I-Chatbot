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

    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash",

        input: query,

        system_instruction: `You are a Starbucks AI Assistant.

You help customers with Starbucks-related questions.

You can only answer questions about these topics:

1. Menu
2. Coffee
3. Prices
4. Orders
5. Store locations

Keep your answers short, friendly and simple.

Starbucks offers:
Coffee
Frappuccino
Tea
Refreshers
Sandwiches
Bakery items

If the user asks about coffee:
Recommend a suitable Starbucks drink.

If the user asks about the menu:
Give a short description of Starbucks menu items.

If the user asks about prices:
Give general information about Starbucks prices.

If the user asks about orders:
Give general information about placing or checking an order.

If the user asks about store locations:
Give general information about Starbucks stores.

If the user asks something unrelated to Starbucks, reply:

"Sorry, I can only help with Starbucks menu, coffee, prices, orders and store locations."

Keep every response short and concise.

Always be polite and helpful.

IMPORTANT RESPONSE FORMAT:
Do not use asterisks (*).
Do not use double asterisks (**).
Do not use hashtags (#).
Do not use special symbols for formatting.`,
      });

      setResponse(interaction.output_text);
    } catch (err) {
      console.log(err);

      setResponse(err.message || "Something went wrong");
    }

    setLoading(false);
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
            <p>Starbucks AI is thinking...</p>
          ) : response ? (
            <p>{response}</p>
          ) : (
            <p className="muted">
              Ask about menu, coffee, prices, orders or locations.
            </p>
          )}
        </div>

        <form
          className="chatbot-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="query">
            Query
          </label>

          <input
            type="text"
            name="query"
            id="query"
            placeholder="Ask about coffee, menu, prices..."
            value={query}
            onChange={handleChange}
            disabled={loading}
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
