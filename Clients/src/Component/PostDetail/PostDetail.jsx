import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE, UPLOADS_BASE } from "../../api";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetch(`${API_BASE}/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-detail">
      {post.image && <img src={`${UPLOADS_BASE}${post.image}`} alt={post.title} className="post-img" />}
      <h1>{post.title}</h1>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
      <p style={{whiteSpace:"pre-wrap"}}>{post.desc}</p>
    </div>
  );
}
