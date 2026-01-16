import React from "react";
import { useNavigate } from "react-router-dom";
import { UPLOADS_BASE } from "../api";

import "./Post.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <article className="post-card" onClick={() => navigate(`/post/${post._id}`)}>
      <div className="post-img-container">
        {post.image ? (
          <img
            src={post.image.startsWith("http") ? post.image : UPLOADS_BASE + post.image}
            alt={post.title}
            className="post-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
            }}
          />
        ) : (
          <img
            src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Placeholder"
            className="post-img"
          />
        )}
      </div>
      <div className="post-info">
        <div className="post-categories">
          {post.category && <span className="post-category">{post.category}</span>}
        </div>
        <h3 className="post-title">{post.title}</h3>
        <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
        <p className="post-desc">{post.desc}</p>
        <button className="read-more-btn">Read More</button>
      </div>
    </article>
  );
}
