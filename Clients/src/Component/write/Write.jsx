import { useState, useContext, useEffect } from "react";
import { API_BASE } from "../../api";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import "./Write.css";

export default function Write() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(Context);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Form validation
  const isFormValid = title.trim() !== "" && desc.trim() !== "";

  // Image upload handler
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setFile(selectedImage);
    }
  };

  // Reset image
  const resetImage = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("username", user ? user.username : "Anonymous");

    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        navigate(`/post/${data._id}`);
      } else {
        console.error("Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="write-container">
      <h2 className="write-title">Write a New Blog</h2>

      <form className="write-form" onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="image-upload-box">
          {!file ? (
            <label className="upload-area">
              <span className="material-icons">upload</span>
              <p>Click to Upload Image</p>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="preview-wrapper">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="preview-img"
              />
              <button
                type="button"
                className="reset-image-btn"
                onClick={resetImage}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Title Input */}
        <input
          type="text"
          className="write-input"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="write-textarea"
          placeholder="Write your blog content..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {/* Submit Button */}
        <button type="submit" className="write-submit" disabled={!isFormValid}>
          Publish
        </button>
      </form>
    </div>
  );
}
