import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./App/models/Post.js";

dotenv.config();

const dummyPosts = [
    // 🔹 Tech & Digital Trends
    {
        title: "Best AI Tools for Productivity in 2026",
        desc: "Explore the most powerful AI tools in 2026 that boost productivity, automate tasks, and save time for professionals and creators. Learn how these tools can simplify daily workflows.",
        username: "TechGuru",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        categories: ["Tech & Digital Trends"]
    },
    {
        title: "How to Use AI to Write Content or Manage Tasks",
        desc: "Discover how AI helps in content writing, planning, and task automation. A practical guide for beginners and professionals.",
        username: "AI_Wizard",
        image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=800",
        categories: ["Tech & Digital Trends"]
    },
    {
        title: "Is AI Replacing Jobs or Creating New Ones?",
        desc: "An in-depth look at AI’s impact on employment, job roles, and future opportunities in the tech-driven world.",
        username: "FutureWork",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        categories: ["Tech & Digital Trends"]
    },
    {
        title: "AI Safety & Privacy Concerns",
        desc: "Understand the risks, ethical concerns, and privacy challenges associated with AI technologies.",
        username: "SecureTech",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        categories: ["Tech & Digital Trends"]
    },
    {
        title: "What’s Next After Crypto?",
        desc: "Explore emerging technologies beyond cryptocurrency and how digital finance is evolving.",
        username: "FinTechPro",
        image: "https://images.unsplash.com/photo-1621504450168-b8c4351b0b57?auto=format&fit=crop&q=80&w=800",
        categories: ["Tech & Digital Trends"]
    },
    {
        title: "Real-World Blockchain Use Cases",
        desc: "Learn how blockchain technology is being used in real industries beyond cryptocurrencies.",
        username: "BlockChainDev",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
        categories: ["Tech & Digital Trends"]
    },
    {
        title: "How to Protect Your Data in 2026",
        desc: "A complete guide to protecting personal and professional data in an advanced digital world.",
        username: "CyberGuard",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
        categories: ["Tech & Digital Trends"]
    },
    {
        title: "Privacy Tools Everyone Should Use",
        desc: "Discover essential privacy tools that help secure online identity and personal data.",
        username: "PrivacyFirst",
        image: "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&q=80&w=800",
        categories: ["Tech & Digital Trends"]
    },

    // 🔹 Business & Entrepreneurship
    {
        title: "How to Build a Remote-Ready Team",
        desc: "Learn how businesses can successfully build and manage remote teams.",
        username: "BizLeader",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        categories: ["Business & Entrepreneurship"]
    },
    {
        title: "Tools for Productivity & Collaboration",
        desc: "Top tools that help teams collaborate and stay productive remotely.",
        username: "RemotePro",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        categories: ["Business & Entrepreneurship"]
    },
    {
        title: "Best Online Side Jobs in 2026",
        desc: "Explore profitable side hustles that actually work in 2026.",
        username: "SideHustleKing",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
        categories: ["Business & Entrepreneurship"]
    },
    {
        title: "Case Studies of Successful Side Hustles",
        desc: "Real stories of people who turned side hustles into income sources.",
        username: "SuccessStory",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        categories: ["Business & Entrepreneurship"]
    },
    {
        title: "How to Find High-Pay Clients",
        desc: "A freelancer’s guide to attracting premium clients.",
        username: "FreelanceGuru",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
        categories: ["Business & Entrepreneurship"]
    },
    {
        title: "Pricing Strategies That Work",
        desc: "Learn how to price your services for maximum profit and value.",
        username: "BizStrategy",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
        categories: ["Business & Entrepreneurship"]
    },

    // 🔹 Self-Improvement & Productivity
    {
        title: "Daily Habits for Better Focus",
        desc: "Simple habits that improve concentration and productivity.",
        username: "MindfulLife",
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=800",
        categories: ["Self-Improvement & Productivity"]
    },
    {
        title: "Managing Burnout in a Digital Age",
        desc: "Practical ways to manage stress and digital burnout.",
        username: "WellnessCoach",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
        categories: ["Self-Improvement & Productivity"]
    },
    {
        title: "Budgeting for Young Adults",
        desc: "A beginner-friendly guide to personal budgeting.",
        username: "MoneyMatters",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
        categories: ["Self-Improvement & Productivity"]
    },
    {
        title: "Beginner’s Guide to Investing",
        desc: "Learn the basics of investing safely and wisely.",
        username: "Investor101",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
        categories: ["Self-Improvement & Productivity"]
    },
    {
        title: "Top Skills to Learn for Future Jobs",
        desc: "Skills that will be in demand in future job markets.",
        username: "CareerCoach",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        categories: ["Self-Improvement & Productivity"]
    },
    {
        title: "Courses Worth Your Time",
        desc: "Best free and paid courses for career growth.",
        username: "EduTech",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
        categories: ["Self-Improvement & Productivity"]
    },

    // 🔹 Lifestyle & Culture
    {
        title: "Zero-Waste Tips for Beginners",
        desc: "Simple ways to start a zero-waste lifestyle.",
        username: "EcoLife",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80&w=800",
        categories: ["Lifestyle & Culture"]
    },
    {
        title: "Eco-Friendly Products Worth Buying",
        desc: "Sustainable products that make a real impact.",
        username: "GreenChoice",
        image: "https://images.unsplash.com/photo-1610419627061-13a8cd37b1cc?auto=format&fit=crop&q=80&w=800",
        categories: ["Lifestyle & Culture"]
    },
    {
        title: "Best Places to Visit in 2026",
        desc: "Trending travel destinations for 2026.",
        username: "Traveller",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
        categories: ["Lifestyle & Culture"]
    },
    {
        title: "Travel on a Budget",
        desc: "How to travel smart without overspending.",
        username: "BudgetTravel",
        image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&q=80&w=800",
        categories: ["Lifestyle & Culture"]
    },
    {
        title: "Fitness Routines for Busy Lifestyles",
        desc: "Quick fitness routines for busy people.",
        username: "FitLife",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
        categories: ["Lifestyle & Culture"]
    },
    {
        title: "Nutrition Myths vs Facts",
        desc: "Debunk common nutrition myths with facts.",
        username: "NutriFact",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
        categories: ["Lifestyle & Culture"]
    },

    // 🔹 Content Creation & Blogging
    {
        title: "How to Rank Your Blog in 2026",
        desc: "SEO strategies that work in 2026.",
        username: "SEOMaster",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
        categories: ["Content Creation & Blogging"]
    },
    {
        title: "Keyword Research Tools & Strategies",
        desc: "Learn how to find the right keywords for growth.",
        username: "KeywordKing",
        image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
        categories: ["Content Creation & Blogging"]
    },
    {
        title: "Reels, Shorts & TikTok Content Ideas",
        desc: "Creative short-form video ideas for growth.",
        username: "SocialBuzz",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
        categories: ["Content Creation & Blogging"]
    },
    {
        title: "Repurposing Blog Content for Social Media",
        desc: "Maximize reach by reusing content smartly.",
        username: "ContentStrat",
        image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=800",
        categories: ["Content Creation & Blogging"]
    },
    {
        title: "Affiliate Marketing That Pays",
        desc: "How bloggers earn through affiliate marketing.",
        username: "AffiliatePro",
        image: "https://images.unsplash.com/photo-1565514020176-dbf2277f6d62?auto=format&fit=crop&q=80&w=800",
        categories: ["Content Creation & Blogging"]
    },
    {
        title: "Selling Digital Products",
        desc: "Create and sell digital products successfully.",
        username: "DigitalSeller",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        categories: ["Content Creation & Blogging"]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("✅ MongoDB Connected for Seeding");

        // Clear existing posts
        await Post.deleteMany({});
        console.log("🗑️ Cleared existing posts");

        await Post.insertMany(dummyPosts);
        console.log("🌱 Database Seeded with Dummy Posts");

        mongoose.connection.close();
    } catch (err) {
        console.error("❌ Seeding Error:", err);
    }
};

seedDB();
