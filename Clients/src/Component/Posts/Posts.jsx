import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { API_BASE, UPLOADS_BASE } from "../../api";
import "./Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/posts${search}`);
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search]);

  // CATEGORIES TO SHOW ON HOMEPAGE
  const homepageCategories = [
    "Tech & Digital Trends",
    "Business & Entrepreneurship",
    "Self-Improvement & Productivity",
    "Lifestyle & Culture",
    "Content Creation & Blogging"
  ];

  // Helper to render a single post card
  const renderPostCard = (post) => (
    <Link key={post._id} to={`/post/${post._id}`} className="post-card">
      <div className="post-img-wrapper">
        {post.image ? (
          <img
            src={post.image.startsWith("http") ? post.image : UPLOADS_BASE + post.image}
            alt={post.title}
            className="post-img"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg";
            }}
          />
        ) : (
          <img
            src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg"
            alt="Placeholder"
            className="post-img"
          />
        )}
      </div>

      <div className="post-content">
        <div className="post-meta">
          <span className="post-date">
            {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </span>
          <span className="post-cat">
            {post.categories?.[0] || 'Article'}
          </span>
        </div>

        <h3 className="post-title">{post.title}</h3>
        <p className="post-desc">{post.desc}</p>
        <div className="post-footer">
          <span className="post-read-more">Read more →</span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="posts-feed">
      {/* LOADING STATE */}
      {loading && Array(6).fill(0).map((_, i) => (
        <div key={i} className="post-skeleton-card">
          <Skeleton height={250} />
          <div style={{ padding: 10 }}>
            <Skeleton count={3} />
          </div>
        </div>
      ))}

      {/* RENDER LOGIC */}
      {!loading && (
        !search ? (
          // HOMEPAGE VIEW: 1 Post per Category
          <div className="homepage-sections">
            {homepageCategories.map((catName) => {
              // Find the first post that has this category
              const categoryPost = posts.find(p => p.categories?.includes(catName));
              if (!categoryPost) return null;

              return (
                <div key={catName} className="category-section">
                  {/* <h2 className="section-heading">
                    <span className="heading-icon">✨</span> {catName}
                  </h2> */}
                  <div className="section-post">
                    {renderPostCard(categoryPost)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // STANDARD VIEW (Search/Filter results)
          <div className="standard-feed">
            {posts.map(post => renderPostCard(post))}
          </div>
        )
      )}
    </div>
  );
}
