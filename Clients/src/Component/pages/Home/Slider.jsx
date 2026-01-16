import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function FeaturedSlider() {
  const navigate = useNavigate();

  const featuredPosts = [
    {
      id: 1,
      title: "Exploring the Alps: A Journey Above the Clouds",
      category: "Travel",
      desc: "The Alps are not just a mountain range — they are a living paradise for adventurers, photographers, and dreamers alike. Stretching across eight European countries, these majestic peaks offer everything from snow-capped adventures to serene lakeside escapes. Whether you’re hiking through the green valleys of Switzerland, skiing in Austria, or savoring French alpine cuisine, every corner of the Alps has its own unique charm. Experience the warmth of mountain villages, the thrill of high-altitude trails, and the breathtaking beauty of sunrise over snow-dusted peaks. It’s more than a trip — it’s a journey into nature’s masterpiece.",
      img: "https://images.pexels.com/photos/21014/pexels-photo.jpg",
    },
    {
      id: 2,
      title: "10 Delicious Vegan Recipes for a Healthy Lifestyle",
      category: "Food",
      desc: "Vegan food isn’t just about salads — it’s a colorful and creative way to enjoy meals that nourish both the body and the planet. From creamy avocado pasta and protein-packed chickpea curries to indulgent chocolate mousse made with coconut cream, vegan cooking is bursting with flavor and texture. In this article, we’ll walk you through ten simple yet mouthwatering recipes perfect for beginners and seasoned food lovers alike. You’ll learn how to balance plant-based proteins, enhance flavor using herbs and spices, and create dishes so delicious that even non-vegans will be asking for seconds.",
      img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    },
    {
      id: 3,
      title: "The Art of Lo-Fi: How Music Shapes Your Mood",
      category: "Music",
      desc: "Lo-Fi music has taken the world by storm — not through loud beats, but through calm, nostalgic soundscapes that heal the mind. Originating from imperfections in recording, Lo-Fi music embraces raw, authentic emotion. Whether you’re studying late at night, sketching ideas, or sipping coffee by the window, these chill beats create an atmosphere of peace and creativity. In this feature, we explore how Lo-Fi music influences mental clarity, why it’s so effective for relaxation, and how modern artists are blending vintage sounds with digital rhythm to shape a genre that speaks to the soul.",
      img: "https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg",
    },
    {
      id: 4,
      title: "Building a Weather App with React and OpenWeather API",
      category: "Code",
      desc: "Want to build something practical and visually engaging with React? A weather app is the perfect project to get started. In this step-by-step guide, we’ll show you how to create a dynamic weather application that fetches real-time data using the OpenWeather API. You’ll learn how to set up your components, handle API responses, and display temperature, humidity, and city data beautifully with Tailwind CSS. We’ll also cover how to integrate loading states, error handling, and responsive design. By the end, you’ll not only have a working app but also a stronger grasp of React fundamentals and API integration.",
      img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    },
    {
      id: 5,
      title: "Minimalist Design: The Power of Less",
      category: "Design",
      desc: "Minimalism in design is more than just white space — it’s a philosophy that values clarity, functionality, and purpose. A minimalist interface guides users effortlessly, allowing content and visuals to shine without distractions. In this article, we dive deep into how simplicity can enhance usability and brand identity. You’ll learn the principles of minimalism, from typography and color psychology to layout and grid balance. We’ll also explore famous minimalist designs from Apple and Google, showing how 'less' truly becomes 'more' when every detail is intentional. Perfect for designers looking to craft elegant, modern digital experiences.",
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
                <p className="card-desc">
                  {post.desc.slice(0, 150)}...
                </p>
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
