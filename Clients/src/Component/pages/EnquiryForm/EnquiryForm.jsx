import React, { useState } from "react";
import "./EnquiryForm.css";

function EnquiryForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("⚠️ Please fill in all fields before submitting.");
      return;
    }
    setError("");
    setSubmitted(true);
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="enquiry-container">
      <div className="enquiry-card">
        <h1 className="enquiry-title">📩 Contact Us</h1>
        <form onSubmit={handleSubmit} className="enquiry-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            className="input-field"
            value={formData.message}
            onChange={handleChange}
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
        {submitted && (
          <p className="success-text">
            ✅ Your enquiry has been submitted successfully!
          </p>
        )}
      </div>

      <div className="readmore-section">
        <p className="readmore-text">
          {showMore
            ? "We appreciate your interest! Our support team is available 24/7 to assist you with any queries. You’ll receive a response within 24 hours. Thank you for connecting with us!"
            : "We appreciate your interest! Our support team is available 24/7 to assist you..."}
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="readmore-btn"
        >
          {showMore ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
}

export default EnquiryForm;
