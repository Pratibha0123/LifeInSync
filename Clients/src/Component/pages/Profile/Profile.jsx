import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/profile/pratibha@example.com")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => {
        console.error("❌ Error fetching profile:", err);
        setError("Failed to load profile. Please try again later.");
      });
  }, []);

  if (error) {
    return (
      <div className="profile2026-container">
        <div className="profile2026-card">
          <h2 className="error-text">{error}</h2>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile2026-container">
        <div className="profile2026-card">
          <h2 className="loading-text">Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile2026-container">
      <div className="profile2026-card">
        <div className="profile2026-header">
          <div className="profile2026-avatar">
            <img
              src={
                profile.profileImg
                  ? `http://localhost:5000${profile.profileImg}`
                  : "https://via.placeholder.com/120"
              }
              alt={profile.name}
            />
          </div>
        </div>

        <div className="profile2026-content">
          <div className="profile2026-info">
            <div>
              <h1>{profile.name}</h1>
              <p>{profile.bio}</p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Location:</strong> {profile.location}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.website}
                </a>
              </p>
            </div>

            <div className="profile2026-actions">
              <button className="edit-btn">✏️ Edit Profile</button>
              <button className="logout-btn">🚪 Logout</button>
            </div>
          </div>

          <div className="profile2026-stats">
            <div className="stat-box">
              <span className="icon purple">📄</span>
              <h3>24</h3>
              <p>Posts</p>
            </div>
            <div className="stat-box">
              <span className="icon pink">👥</span>
              <h3>150</h3>
              <p>Followers</p>
            </div>
            <div className="stat-box">
              <span className="icon green">❤️</span>
              <h3>320</h3>
              <p>Likes</p>
            </div>
          </div>

          <div className="recent-posts">
            <h2>Recent Posts</h2>
            <div className="post-grid">
              <div className="post-card">
                <h3>Exploring React Hooks</h3>
                <p>
                  A quick guide to understanding useState and useEffect in
                  functional components.
                </p>
                <button className="read-more">Read More →</button>
              </div>

              <div className="post-card">
                <h3>Building with Next.js</h3>
                <p>
                  Learn why Next.js is perfect for modern full-stack web
                  applications.
                </p>
                <button className="read-more">Read More →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
