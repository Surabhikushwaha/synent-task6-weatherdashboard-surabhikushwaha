function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <h2>🌤️ Weather Dashboard</h2>

      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
}

export default Navbar;