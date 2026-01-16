import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_BASE, UPLOADS_BASE } from "../../api";
import { Context } from "../../context/Context";
import "./SinglePost.css";

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE}/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
        setTitle(data.title);
        setDesc(data.desc);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`${API_BASE}/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // If your backend required username/auth for delete, you'd add body: JSON.stringify({ username: user.username })
        // But our simple backend implementation just deletes by ID
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await fetch(`${API_BASE}/posts/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, title, content: desc }),
      });
      setUpdateMode(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="single-post">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return <p style={{ textAlign: "center" }}>Post not found.</p>;
  }

  return (
    <article className="single-post-container">
      {/* Featured Image */}
      <figure className="single-post-image-container">
        <img
          src={
            post.image
              ? (post.image.startsWith("http")
                ? post.image
                : UPLOADS_BASE + post.image)
              : "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={post.title}
          className="single-post-image"
          crossOrigin="anonymous"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
          }}
        />
      </figure>

      {/* Title Section */}
      <header className="single-post-header">
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="single-post-title-input centered-input"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="single-post-title">
            {title}
            {user?.username === post.username && (
              <div className="single-post-actions-floating">
                <i className="far fa-edit action-icon" title="Edit" onClick={() => setUpdateMode(true)}></i>
                <i className="far fa-trash-alt action-icon" title="Delete" onClick={handleDelete}></i>
              </div>
            )}
          </h1>
        )}

        <div className="single-post-meta-container">
          {post.category && (
            <span className="single-post-cat-pill">{post.category}</span>
          )}

          <div className="single-post-meta-info">
            <span className="single-post-author">
              By <Link to={`/?user=${post.username}`} className="author-link">{post.username}</Link>
            </span>
            <span className="meta-dot">·</span>
            <span className="single-post-date">
              {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <section className="single-post-content-wrapper">
        {updateMode ? (
          <textarea
            className="single-post-desc-textarea"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <div className="single-post-body-text">
            {desc}
          </div>
        )}

        {updateMode && (
          <div className="update-actions">
            <button className="single-post-cancel-btn" onClick={() => setUpdateMode(false)}>
              Cancel
            </button>
            <button className="single-post-save-btn" onClick={handleUpdate}>
              Save Changes
            </button>
          </div>
        )}

      </section>

      {/* Related Posts Section */}
      {/* <section className="related-posts-container">
        <h3 className="related-title">You might also like</h3>
        <div className="related-grid">
          {[1, 2, 3].map((item) => (
            <Link to={`/post/${item}`} className="related-card" key={item}>
              <div className="related-img-wrapper">
                <img
                  src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Related Post"
                  className="related-img"
                />
                <span className="related-cat-tag">Technology</span>
              </div>
              {/* <div className="related-info">
                <h4 className="related-post-title">The Future of Web Development in 2026</h4>
                <p className="related-desc">Explore the latest trends in AI, React, and server-side rendering...</p>
              </div> */}
      {/* </Link>
          ))}
        </div>
      </section> */}
    </article >
  );
}
