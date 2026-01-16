import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedSlide.css";

export default function FeaturedSlider() {
  const navigate = useNavigate();

  const featuredPosts = [
    {
      id: 1,
      title: "Exploring the Alps: A Journey Above the Clouds",
      category: "Travel",
      desc: "The Alps are not just a mountain range — they are a living paradise for adventurers, photographers, and dreamers alike. Stretching across eight European countries, these majestic peaks offer everything from snow-capped adventures to serene lakeside escapes.",
      img: "https://images.pexels.com/photos/21014/pexels-photo.jpg",
    },
    {
      id: 2,
      title: "10 Delicious Vegan Recipes for a Healthy Lifestyle",
      category: "Food",
      desc: "Vegan food isn’t just about salads — it’s a colorful and creative way to enjoy meals that nourish both the body and the planet. From creamy avocado pasta and protein-packed chickpea curries to indulgent chocolate mousse made with coconut cream.",
      img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    },
    {
      id: 3,
      title: "The Art of Lo-Fi: How Music Shapes Your Mood",
      category: "Music",
      desc: "Lo-Fi music has taken the world by storm — not through loud beats, but through calm, nostalgic soundscapes that heal the mind. Whether you’re studying or relaxing, these chill beats create an atmosphere of peace and creativity.",
      img: "https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg",
    },
    {
      id: 4,
      title: "Building a Weather App with React and OpenWeather API",
      category: "Code",
      desc: "Want to build something practical with React? A weather app is the perfect start. Learn how to create a dynamic weather application that fetches real-time data using the OpenWeather API and displays it beautifully.",
      img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    },
    {
      id: 5,
      title: "Minimalist Design: The Power of Less",
      category: "Design",
      desc: "Minimalism in design is more than white space — it’s about clarity, purpose, and function. Learn how simplicity enhances usability and makes interfaces elegant and user-centered.",
      img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="home-container">
      <section className="featured-posts">
        <h2 className="section-title">🔥 Featured Posts</h2>
        <Slider {...settings} className="featured-slider">
          {featuredPosts.map((post) => (
            <div className="card" key={post.id}>
              <img src={post.img} alt={post.title} className="card-img" />
              <div className="card-content">
                <span className="card-category">{post.category}</span>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-desc">{post.desc.slice(0, 150)}...</p>
                <button
                  className="read-btn"
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}
