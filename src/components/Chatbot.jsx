import { useContext, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { UserProvider } from "../context/UserContext";
import "./Chatbot.css";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
apiKey: apiKey,
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

if (!query.trim() || loading) return;

setLoading(true);
setResponse("");

try {
  const result = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: query,
    config: {
      systemInstruction: `

You are a Starbucks AI Assistant.

You only answer questions about:

1. Starbucks menu
2. Coffee
3. Prices
4. Orders
5. Store locations

Starbucks offers coffee, Frappuccino, tea, refreshers,
sandwiches, and bakery items.

Recommend suitable Starbucks drinks when asked about coffee.
Describe menu items briefly when asked about the menu.
For prices, explain that prices vary by location and drink.
For orders, provide general ordering guidance.
For store locations, suggest checking the official Starbucks website.

Do not invent exact prices, order details, or store addresses.

If the question is unrelated to Starbucks, reply:
Sorry, I can only help with Starbucks menu, coffee, prices, orders and store locations.

Keep answers short, friendly, simple, and polite.
Do not use asterisks or hashtags for formatting.
`,
},
});

  setResponse(
    result.text || "Sorry, I could not generate a response. Please try again."
  );
} catch (err) {
  console.error("Gemini API Error:", err);

  setResponse(
    err.message || "Something went wrong. Please try again."
  );
} finally {
  setLoading(false);
}

};

const logout = () => {
setUserInfo(null);
};

return ( <main className="chatbot-page"> <section className="card chatbot-card"> <div className="topbar"> <div className="chatbot-heading"> <h1>Starbucks AI</h1>

        <p className="muted">
          Welcome, {userInfo?.name || "Customer"}
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

      <button
        type="submit"
        disabled={loading || !query.trim()}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  </section>
</main>

);
}

export default Chatbot;