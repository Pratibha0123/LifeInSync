import React from "react";
import { useParams } from "react-router-dom";
import "./postDetail.css";

const featuredPosts = [
  // same array as above or imported from a data file
];

export default function PostDetail() {
  const { id } = useParams();
  const post = featuredPosts.find((p) => p.id === Number(id));

  if (!post) return <h2>Post not found!</h2>;

  return (
    <div className="post-detail-container">
      <img src={post.img} alt={post.title} className="detail-img" />
      <h1 className="detail-title">{post.title}</h1>
      <p className="detail-category">{post.category}</p>
      <p className="detail-desc">{post.desc}</p>
    </div>
  );
}
