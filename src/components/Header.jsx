import "./Header.css";


function Header() {
  return (
    <header className="site-header">
      <div className="header-container">

        <div className="header-brand">
          <div className="header-logo">🤖</div>

          <div>
            <h2>Starbucks AI</h2>
            <span>Smart Coffee Assistant</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
