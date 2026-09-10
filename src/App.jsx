import { useContext } from "react";
import LoginForm from "./components/Login";
import Chatbot from "./components/Chatbot";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";

import "./App.css";

function App() {
  const { userInfo } = useContext(UserProvider);

  return (
    <div className="app-layout">

      <Header />

      <main className="app-content">
        {!userInfo ? <LoginForm /> : <Chatbot />}
      </main>

      <Footer />

    </div>
  );
}

export default App;
