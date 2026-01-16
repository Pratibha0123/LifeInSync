import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Topbar from "./Component/topbar/Topbar";
import Footer from "./Component/Footer/Footer";
import Homes from "./Component/pages/Home/Homes";
import Slider from "./Component/pages/FeaturedSlide/FeaturedSlide";
import FeaturePosts from "./Component/pages/Home/featuredPosts";

import About from "./Component/About/About";
import Contact from "./Component/Contact/Contact";
import Write from "./Component/write/Write";
import Login from "./Component/pages/Login/Login";
import Register from "./Component/pages/Register/Register";
import Setting from "./Component/pages/Setting/Setting";
import SinglePost from "./Component/pages/single/Single";
import Logout from "./Component/pages/Logout/Logout";
import Profile from "./Component/pages/Profile/Profile";
import PostDetail from "./Component/PostDetail/PostDetail";
import EditProfile from "./Component/pages/EditProfile/EditProfile";
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Homes /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/write" element={<PageWrapper><Write /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/setting" element={<PageWrapper><Setting /></PageWrapper>} />
        <Route path="/single" element={<PageWrapper><SinglePost /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/post/:id" element={<PageWrapper><SinglePost /></PageWrapper>} />
        <Route path="/edit-profile" element={<PageWrapper><EditProfile /></PageWrapper>} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/features-post/:id" element={<FeaturePosts />} />
        <Route path="/logout" element={<PageWrapper><Logout /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app-container">
        <Topbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}
