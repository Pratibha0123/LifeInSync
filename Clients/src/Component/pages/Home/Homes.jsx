import React from "react";
import Header from "../../Herader/Header";
import Sidebar from "../../Sidebar/Sidebar";
import Posts from "../../Posts/Posts";
import "./home.css";

export default function Home() {
  return (
    <>
      <Header />

      <div className="home-container">
        {/* 📰 Main Posts Section */}
        <div className="home-main">
          <Posts />
        </div>

        {/* 📂 Sidebar */}
        <Sidebar />
      </div>
    </>
  );
}
