import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { UPLOADS_BASE } from "../../api";
import "./TopBar.css";
import dummy_image from "./OIP.jpeg";
import { FaFeatherAlt } from "react-icons/fa";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setProfileOpen(false);
    setSearchOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setProfileOpen(false);
    navigate("/login");
  };

  const profilePic = user && user.profilePic
    ? (user.profilePic.startsWith("http") ? user.profilePic : UPLOADS_BASE + user.profilePic)
    : dummy_image;

  return (
    <header className={`topbar ${darkMode ? "dark" : ""}`}>
      <div className="topbar-container">
        <div className="topbar-logo">
          <Link to="/" aria-label="Home">
            <span className="logo-icon"><FaFeatherAlt /></span>
            <span className="logo-text">LifeIn<em>Sync</em></span>
          </Link>
        </div>

        <nav className={`topbar-nav ${menuOpen ? "open" : ""}`} aria-label="Main Navigation">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/write" onClick={() => setMenuOpen(false)}>Write</Link>
          {!user ? (
            <div className="mobile-auth-links">
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          ) : (
            <div className="mobile-auth-links">
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <span onClick={() => { handleLogout(); setMenuOpen(false); }} className="nav-link-span">Logout</span>
            </div>
          )}
        </nav>

        <div className="topbar-right">
          <div className="search-container">
            <i
              className={`fas fa-search search-icon ${searchOpen ? "active" : ""}`}
              onClick={toggleSearch}
              role="button"
              aria-label="Toggle Search"
              tabIndex="0"
            ></i>
            {searchOpen && (
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            )}
          </div>

          <button
            className="darkModeBtn"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {/* {darkMode ? "🌞" : "🌙"} */}
          </button>

          {user ? (
            <div className="profile-container" onClick={toggleProfile} role="button" aria-haspopup="true" aria-expanded={profileOpen} tabIndex="0">
              <img src={profilePic} alt="Profile" className="profile-img" />
              {profileOpen && (
                <div className="profile-dropdown">
                  <Link to="/profile" onClick={() => setProfileOpen(false)}>Profile</Link>
                  <span onClick={handleLogout} className="logout-btn" role="button" tabIndex="0">Logout</span>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-login-btn">Login</Link>
              <Link to="/register" className="nav-register-btn">Register</Link>
            </div>
          )}

          <div
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            role="button"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            tabIndex="0"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
