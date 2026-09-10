import { useContext, useState } from "react";
import { UserProvider } from "../context/UserContext";
import "./Login.css";

function LoginForm() {
  const { setUserInfo } = useContext(UserProvider);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    if (
      email === "hassanali@gmail.com" &&
      password === "hassan01"
    ) {
      alert("Logged in Successfully");

      setUserInfo({
        email: email,
        name: "Hassan Ali",
      });
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <main className="page login-page">
      <div className="login-wrapper">

        {/* =========================
            WELCOME SECTION
        ========================== */}
        <div className="welcome-section">

          <div className="brand-line">
            <span className="brand-dot"></span>
            STARBUCKS CHATBOT
          </div>

          <h2>
            Welcome to <span>Starbucks</span>
          </h2>

          <p>
            Your smart coffee companion
          </p>

          <h1><div className="creator">
            Created by by{" "}
            <strong>Hassan Ali</strong>
          </div></h1>

        </div>


        {/* =========================
            LOGIN CARD
        ========================== */}
        <form
          className="card login-card"
          onSubmit={login}
        >

          <h1>Login</h1>

          <p className="muted">
            Please enter your login details
          </p>


          {/* Email */}
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          {/* Password */}
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          {/* Login Button */}
          <button type="submit">
            Login
          </button>


          {/* Demo Login Details */}
          <div className="login-details">

            <h3>Demo Login Details</h3>

            <div className="detail-row">
              <span>Email:</span>

              <strong>
                hassanali@gmail.com
              </strong>
            </div>

            <div className="detail-row">
              <span>Password:</span>

              <strong>
                hassan01
              </strong>
            </div>

          </div>

        </form>

      </div>
    </main>
  );
}

export default LoginForm;
