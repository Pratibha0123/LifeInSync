import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import Sidebars from './sidebar.jpeg';

export default function Sidebar() {
  const location = useLocation();
  // Dummy data for Trending Topics
  const trendingTopics = [
    { id: 1, name: "Tech & Digital Trends" },
    { id: 2, name: "Business & Entrepreneurship" },
    { id: 3, name: "Self-Improvement & Productivity" },
    { id: 4, name: "Lifestyle & Culture" },
    { id: 5, name: "Content Creation & Blogging" },
  ];

  return (
    <aside className="sidebar">
      {/* About Me Section */}
      <div className="sidebarItem about-me">
        <span className="sidebarTitle">About Me</span>
        <div className="sidebarCard">
          <img className="sidebarImg" src={Sidebars} alt="About Me" />
          <p className="sidebarDesc">
            Hi! I'm a passionate developer and writer sharing insights on technology,
            coding, and creative living. Join me on this journey!
          </p>
        </div>
      </div>

      {/* Trending Topics Section */}
      <div className="sidebarItem">
        <span className="sidebarTitle">Trending Topics</span>
        <ul className="sidebarList">
          {trendingTopics.map((topic) => {
            const isActive = location.search === `?cat=${encodeURIComponent(topic.name)}`;
            return (
              <li className="sidebarListItem" key={topic.id}>
                <Link to={`/?cat=${encodeURIComponent(topic.name)}`} className={isActive ? "active" : ""}>
                  {topic.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Trending Posts (Static for UI Demo) */}
      <div className="sidebarItem">
        <span className="sidebarTitle">Trending Now</span>
        <div className="trending-posts">
          <div className="trending-post">
            <span className="trending-num">01</span>
            <div className="trending-info">
              <Link to="/" className="trending-link">The Future of AI in Design</Link>
              <span className="trending-date">Jan 15, 2026</span>
            </div>
          </div>
          <div className="trending-post">
            <span className="trending-num">02</span>
            <div className="trending-info">
              <Link to="/" className="trending-link">Top 10 Travel Destinations</Link>
              <span className="trending-date">Jan 12, 2026</span>
            </div>
          </div>
          <div className="trending-post">
            <span className="trending-num">03</span>
            <div className="trending-info">
              <Link to="/" className="trending-link">Mastering React Hooks</Link>
              <span className="trending-date">Jan 08, 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="sidebarItem">
        <span className="sidebarTitle">Newsletter</span>
        <div className="sidebar-newsletter">
          <p>Get the latest updates delivered straight to your inbox.</p>
          <input type="email" placeholder="Your email address" className="sidebar-input" />
          <button className="sidebar-submit-btn">Subscribe</button>
        </div>
      </div>

      {/* Social Section */}
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarSocial">
          <a href="https://facebook.com" className="sidebarIcon" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="sidebarIcon" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://pinterest.com" className="sidebarIcon" aria-label="Pinterest">
            <i className="fab fa-pinterest-p"></i>
          </a>
          <a href="https://instagram.com" className="sidebarIcon" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </aside>
  );
}
