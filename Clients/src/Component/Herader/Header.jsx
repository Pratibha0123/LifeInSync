import React from "react";
import "./Header.css";
import HeaderImg from "./HeaderImg.jpg";

export default function Header() {
  return (
    <header className="header">
      <div className="header-overlay"></div>
      <img className="headerImg" src={HeaderImg} alt="Header" />

      <div className="headerTitles">
        <span className="headerTitleSm animate-fade">
          React & Node Development
        </span>
        <span className="headerTitleLg animate-slide">The Modern Blog</span>
        <p className="headerSubtitle animate-fade-delay">
          Insights • Code • Creativity
        </p>
      </div>

      <div className="scroll-indicator">
        <span></span>
      </div>
    </header>
  );
}
