import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import MyImg from '../Sidebar/sidebar.jpeg'; // Reusing the sidebar image for consistency or using a placeholder

export default function About() {
  return (
    <div className="about-page">
      {/* 1. Main Heading */}
      <header className="about-header animate-fade-down">
        <h1 className="about-title">About LifeInSync</h1>
        <p className="about-tagline">Exploring life through travel, technology, and taste.</p>
      </header>

      {/* 2. Introduction */}
      <section className="about-intro animate-fade-up">
        <div className="intro-content">
          <p>
            Welcome to <strong>LifeInSync</strong>, your digital sanctuary for discovering the perfect balance between adventure and innovation.
            We are a multi-niche blog dedicated to bringing you the best stories from around the globe, insights into the latest tech trends,
            mouth-watering food experiences, and practical lifestyle tips to elevate your everyday.
          </p>
          <p>
            Whether you are a digital nomad, a foodie, a tech enthusiast, or someone looking for daily inspiration, LifeInSync is here to fuel your curiosity
            and help you navigate the modern world with style and substance.
          </p>
        </div>
      </section>

      {/* 3. Our Mission */}
      <section className="about-mission">
        <div className="mission-card">
          <h2>Our Mission 🚀</h2>
          <p>
            To inspire people to <strong>explore new places</strong>, stay updated with <strong>cutting-edge technology</strong>,
            enjoy diverse <strong>food cultures</strong>, and live a more <strong>connected and fulfilled life</strong>.
          </p>
          <p>
            We believe in authenticity, creativity, and sharing real-world knowledge that adds value to your journey.
          </p>
        </div>
      </section>

      {/* 4. What We Cover */}
      <section className="about-categories">
        <h2>What We Cover</h2>
        <div className="category-grid">
          <div className="category-card travel">
            <span className="cat-icon">✈️</span>
            <h3>Travel</h3>
            <p>Destination guides, itineraries, cultural experiences, and budget travel tips.</p>
          </div>
          <div className="category-card tech">
            <span className="cat-icon">💻</span>
            <h3>Technology</h3>
            <p>Latest trends, web development, AI insights, and digital lifestyle tools.</p>
          </div>
          <div className="category-card food">
            <span className="cat-icon">🍜</span>
            <h3>Food</h3>
            <p>Street food adventures, recipes, restaurant reviews, and global cuisines.</p>
          </div>
          <div className="category-card lifestyle">
            <span className="cat-icon">🌿</span>
            <h3>Lifestyle</h3>
            <p>Productivity, wellness, personal growth, and everyday inspiration.</p>
          </div>
        </div>
      </section>

      {/* 5. Why LifeInSync */}
      <section className="about-why">
        <div className="why-content">
          <h2>Why LifeInSync?</h2>
          <ul>
            <li>✨ <strong>Real Experiences:</strong> Stories based on actual journeys and tests.</li>
            <li>✨ <strong>Simple Explanations:</strong> Tech and lifestyle broken down for everyone.</li>
            <li>✨ <strong>Honest Reviews:</strong> Unbiased opinions on places, food, and gadgets.</li>
            <li>✨ <strong>Modern Design:</strong> A reading experience that pleases the eye.</li>
          </ul>
        </div>
        <div className="why-image-wrapper">
          <img src={MyImg} alt="LifeInSync Vibe" className="why-image" />
        </div>
      </section>

      {/* 6. Closing Line */}
      <section className="about-closing">
        <p>Ready to sync your life with adventure and innovation?</p>
        <Link to="/" className="about-cta-btn">Start Exploring</Link>
      </section>
    </div>
  );
}
